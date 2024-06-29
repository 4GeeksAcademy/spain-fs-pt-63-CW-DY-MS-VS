"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User_Client, User_Artist, Work, Favorites, Shopping_Cart
from api.utils import generate_sitemap
from flask_cors import CORS
import uuid
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt(app)

##---------------------CLIENTS---------------------##

@api.route('/user_client', methods=['POST'], endpoint='create_client')
def create_client():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    image = "user_elfdss"

    if not email or not password:
        return jsonify({"Error": "Username or Password are required"}), 400
    if User_Client.query.filter_by(email = email).first():
        return jsonify({"Error": "User already exists"}), 400
    
    client_id = str(uuid.uuid4())
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User_Client(id = client_id, email = email, password = hashed_password, first_name = first_name, last_name = last_name, image = image)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/login_client', methods=['GET', 'POST'], endpoint='create_client_token')
def create_client_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User_Client.query.filter_by(email = email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=user.id)
        return jsonify({'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@api.route('/user_client', methods=['GET'], endpoint='get_client')
@jwt_required()
def get_client():
    id_client = get_jwt_identity()
    client = User_Client.query.get_or_404(id_client)
    return jsonify(client.serialize()), 200


@api.route('/user_client', methods=['PUT'], endpoint='update_client')
@jwt_required()
def update_client():
    id = get_jwt_identity()
    data = request.json
    client = User_Client.query.get_or_404(id)
    client.first_name = data["first_name"]
    client.last_name = data["last_name"]

    try:
        db.session.commit()
        return jsonify({
            "first_name": client.first_name,
            "last_name": client.last_name,
        })
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
@api.route('/user_client_image', methods=['PUT'], endpoint='update_client_image')
@jwt_required()
def update_picture():
    id = get_jwt_identity()
    data = request.json
    client = User_Client.query.get_or_404(id)
    client.image = data["image"]

    try: 
        db.session.commit()
        return jsonify({"image": client.image})
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

@api.route('/user_client/password', methods=['PUT'], endpoint='update_client_password')
@jwt_required()
def update_client_password():
    id = get_jwt_identity()
    data = request.json
    client = User_Client.query.get_or_404(id)
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    client.password =hashed_password
   
    try:
        db.session.commit()
        return jsonify({"Message":'ok'})
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500    



##---------------------ARTISTS---------------------##

@api.route('/user_artist', methods=['POST'], endpoint='create_artist')
def create_artist():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    description = data.get("description")
    image = "user_elfdss"

    if not email or not password:
        return jsonify({"Error": "Username or Password are required"}), 400
    if User_Artist.query.filter_by(email = email).first():
        return jsonify({"Error": "User already exists"}), 400
    
    artist_id = str(uuid.uuid4())
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User_Artist(id = artist_id, email = email, password = hashed_password, first_name = first_name, 
                           last_name = last_name, description = description or 'About You', image = image)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/login_artist', methods=['GET', 'POST'], endpoint='create_artist_token')
def create_artist_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User_Artist.query.filter_by(email = email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=user.id)
        return jsonify({'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@api.route('/user_artist', methods=['GET'], endpoint='login_artist')
@jwt_required()
def get_artist():
    id_artist = get_jwt_identity()
    artist = User_Artist.query.get_or_404(id_artist)
    return jsonify(artist.serialize()), 200

@api.route('/user_artist/<string:id>', methods=['GET'], endpoint='get_artist')
def get_artist_from_id(id):
    artist = User_Artist.query.filter_by(id = id).first()
    return jsonify(artist.serialize()), 200


@api.route('/user_artists', methods=['GET'], endpoint='get_all_artists')
def get_all_artists():
    artists = User_Artist.query.all()
    artists = [artist.serialize() for artist in artists]
    return jsonify(artists), 200

@api.route('/works/user_artist/<string:artist_id>', methods=['GET'], endpoint='get_works_by_artist')
def get_works_by_artist(artist_id):
    works = Work.query.filter_by(artist_id=artist_id).all()
    return jsonify([work.serialize() for work in works]), 200

@api.route('/user_artist', methods=['PUT'], endpoint='update_artist')
@jwt_required()
def update_artist():
    id = get_jwt_identity()
    data = request.json
    client = User_Artist.query.get_or_404(id)
    client.first_name = data["first_name"]
    client.last_name = data["last_name"]
    client.description = data["description"]

    try:
        db.session.commit()
        return jsonify({
            "first_name": client.first_name,
            "last_name": client.last_name,
            "description": client.description
        })
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
@api.route('/user_artist_image', methods=['PUT'], endpoint='update_artist_image')
@jwt_required()
def update_picture():
    id = get_jwt_identity()
    data = request.json
    client = User_Artist.query.get_or_404(id)
    client.image = data["image"]

    try: 
        db.session.commit()
        return jsonify({"image": client.image})
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

@api.route('/user_artist/password', methods=['PUT'], endpoint='update_artist_password')
@jwt_required()
def update_artist_password():
    id = get_jwt_identity()
    data = request.json
    client = User_Artist.query.get_or_404(id)
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    client.password =hashed_password
    try:
        db.session.commit()
        return jsonify({"Message":'ok'})
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500    

##---------------------WORKS---------------------##

@api.route('/work', methods=['POST'])
##Pasar el parámetro id_artist a la función para usar de forma dinámica en el flux
def create_work():
    data = request.json
    title = data.get("title")
    type = data.get("type")
    year = data.get("year")
    image = data.get("image")
    description = data.get("description")
    price = data.get("price")
    artist_id = data.get("artist_id")

    work_id = str(uuid.uuid4())

    if not title or not artist_id or not image:
        return jsonify({"Error": "Title, Image and Artist ID are required"}), 400

    new_work = Work(id = work_id, title=title, type=type, year=year, image=image, description=description, price=price, artist_id=artist_id)

    try:
        db.session.add(new_work)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(new_work.serialize()), 201

@api.route('/works', methods=['GET'], endpoint="get_all_works")
def get_all_works():
    works = Work.query.all()
    works = [work.serialize() for work in works]

    return jsonify(works), 200

@api.route('/work/<string:id>', methods=['GET'])
def get_work(id):
    work = Work.query.get_or_404(id)
    return jsonify(work.serialize()), 200

@api.route('/work/<string:id>', methods=['PUT'])
def update_work(id):
    data = request.json
    work = Work.query.get_or_404(id)

    work.title = data.get("title", work.title)
    work.type = data.get("type", work.type)
    work.year = data.get("year", work.year)
    work.image = data.get("image", work.image)
    work.description = data.get("description", work.description)
    work.price = data.get("price", work.price)
    work.artist_id = data.get("artist_id", work.artist_id)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(work.serialize()), 200

@api.route('/work/<string:id>', methods=['DELETE'])
def delete_work(id):
    work = Work.query.get_or_404(id)
    
    try:
        db.session.delete(work)
        db.session.commit()
        return jsonify({"message": f"Work {work.title} has been deleted."}), 200
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

##---------------------FAVORITES---------------------##

@api.route('/favorites_client', methods=['POST'], endpoint="add_client_favorite")
def add_favorite():
    data = request.json
    client_id = data.get("client_id")
    work_id = data.get("work_id")

    favorite_id = str(uuid.uuid4())

    if not client_id or not work_id:
        return jsonify({"Error": "Client ID and Work ID are required"}), 400

    new_favorite = Favorites(id=favorite_id, client_id=client_id, work_id=work_id)

    try:
        db.session.add(new_favorite)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(new_favorite.serialize()), 201

@api.route('/favorites_artist', methods=['POST'], endpoint="add_artist_favorite")
def add_favorite():
    data = request.json
    artist_id = data.get("artist_id")
    work_id = data.get("work_id")

    favorite_id = str(uuid.uuid4())

    if not artist_id or not work_id:
        return jsonify({"Error": "Artist ID and Work ID are required"}), 400

    new_favorite = Favorites(id=favorite_id, artist_id=artist_id, work_id=work_id)

    try:
        db.session.add(new_favorite)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(new_favorite.serialize()), 201

@api.route('/favorites', methods=['GET'])
def get_all_favorites():
    user_id = request.args.get('user_id')
    user_type = request.args.get('user_type')

    if not user_id or not user_type:
        return jsonify({"Error": "User ID and User Type are required"}), 400

    if user_type == "client":
        favorites = Favorites.query.filter_by(client_id=user_id).all()
    elif user_type == "artist":
        favorites = Favorites.query.filter_by(artist_id=user_id).all()
    else:
        return jsonify({"Error": "Invalid user type"}), 400

    return jsonify([favorite.serialize() for favorite in favorites]), 200

@api.route('/favorites/<string:work_id>', methods=['DELETE'])
def delete_favorite(work_id):

    try:
        favorite = Favorites.query.filter_by(work_id=work_id).first_or_404()

        db.session.delete(favorite)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify({"Message": "Favorite deleted successfully"}), 200

##---------------------SHOPPING CART---------------------##

@api.route('/shopping_cart', methods=['POST'])
def add_to_cart():
    data = request.json
    client_id = data.get("client_id")
    work_id = data.get("work_id")
    quantity = data.get("quantity", 1)

    if not client_id or not work_id:
        return jsonify({"Error": "Client ID and Work ID are required"}), 400

    if quantity < 1:
        return jsonify({"Error": "Quantity must be at least 1"}), 400

    work = Work.query.get(work_id)
    if not work:
        return jsonify({"Error": "Work not found"}), 404

    existing_cart_item = Shopping_Cart.query.filter_by(client_id=client_id, work_id=work_id).first()
    if existing_cart_item:
        existing_cart_item.quantity += quantity
        existing_cart_item.total = work.price 
    else:
        cart_id = str(uuid.uuid4())
        new_cart_item = Shopping_Cart(
            id=cart_id,
            client_id=client_id,
            work_id=work_id,
            quantity=quantity,
            total=work.price
        )
        db.session.add(new_cart_item)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(new_cart_item.serialize() if not existing_cart_item else existing_cart_item.serialize()), 201

@api.route('/shopping_cart/<string:client_id>', methods=['GET'])
def get_cart_items(client_id):
    if not client_id:
        return jsonify({"Error": "Client ID is required"}), 400

    cart_items = Shopping_Cart.query.filter_by(client_id=client_id).all()

    if not cart_items:
        return jsonify({"Message": "No items found in the shopping cart"}), 404

    return jsonify([item.serialize() for item in cart_items]), 200

@api.route('/shopping_cart/<string:cart_item_id>', methods=['DELETE'])
def delete_cart_item(cart_item_id):

    try:
        cart_item = Shopping_Cart.query.filter_by(id=cart_item_id).first_or_404()

        db.session.delete(cart_item)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify({"Message": "Item removed from cart successfully"}), 200
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_Client, User_Artist, Work, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import uuid
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
import cloudinary
import cloudinary.uploader
import cloudinary.api

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

    if not email or not password:
        return jsonify({"Error": "Username or Password are required"}), 400
    if User_Client.query.filter_by(email = email).first():
        return jsonify({"Error": "User already exists"}), 400
    
    client_id = str(uuid.uuid4())
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User_Client(id = client_id, email = email, password = hashed_password, first_name = first_name, last_name = last_name)

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


@api.route('/user_client/<string:id>', methods=['PUT'], endpoint='update_client')
def update_client(id):
    data = request.json
    client = User_Client.query.get_or_404(id)
    client.first_name = data.get("first_name", client.first_name)
    client.last_name = data.get("last_name", client.last_name)
    client.password = data.get("password", client.password)
    client.image = data.get("image", client.image)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(client.serialize()), 200

##---------------------ARTISTS---------------------##

@api.route('/user_artist', methods=['POST'], endpoint='create_artist')
def create_artist():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    description = data.get("description")

    if not email or not password:
        return jsonify({"Error": "Username or Password are required"}), 400
    if User_Artist.query.filter_by(email = email).first():
        return jsonify({"Error": "User already exists"}), 400
    
    artist_id = str(uuid.uuid4())
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User_Artist(id = artist_id, email = email, password = hashed_password, first_name = first_name, 
                           last_name = last_name, description = description or 'About You')

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
    print(id)
    artist = User_Artist.query.filter_by(id = id).first()
    return jsonify(artist.serialize()), 200


@api.route('/user_artists', methods=['GET'], endpoint='get_all_artists')
def get_all_artists():
    artists = User_Artist.query.all()
    artists = [artist.serialize() for artist in artists]
    print(artists)
    return jsonify(artists), 200

@api.route('/works/user_artist/<string:artist_id>', methods=['GET'], endpoint='get_works_by_artist')
def get_works_by_artist(artist_id):
    works = Work.query.filter_by(artist_id=artist_id).all()
    return jsonify([work.serialize() for work in works]), 200


@api.route('/user_artist/<string:id>', methods=['PUT'], endpoint='update_artist')
def update_artist(id):
    data = request.json
    artist = User_Artist.query.get_or_404(id)

    artist.first_name = data.get("first_name", artist.first_name)
    artist.last_name = data.get("last_name", artist.last_name)
    artist.email = data.get("email", artist.email)
    artist.password = data.get("password", artist.password)
    artist.description = data.get("description", artist.description)
    artist.image = data.get("image", artist.image)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(artist.serialize()), 200

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
    print(works)
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
## Falta modificar para que las listas de favoritos se adapten al usuario activo
@api.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    client_id = data.get("client_id")
    work_id = data.get("work_id")

    if not client_id or not work_id:
        return jsonify({"Error": "Client ID and Work ID are required"}), 400

    new_favorite = Favorites(client_id=client_id, work_id=work_id)

    try:
        db.session.add(new_favorite)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(new_favorite.serialize()), 201

@api.route('/favorites', methods=['GET'])
## Pasar parámtro user_id para sacar favoritos de usuario
def get_all_favorites():
    favorites = Favorites.query.all()
    return jsonify([favorite.serialize() for favorite in favorites]), 200

@api.route('/favorites/<string:id>', methods=['GET'])
def get_favorite(id):
    favorite = Favorites.query.get_or_404(id)
    return jsonify(favorite.serialize()), 200

@api.route('/favorites/<string:id>', methods=['PUT'])
def update_favorite(id):
    data = request.json
    favorite = Favorites.query.get_or_404(id)

    favorite.client_id = data.get("client_id", favorite.client_id)
    favorite.work_id = data.get("work_id", favorite.work_id)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(favorite.serialize()), 200
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_Client, User_Artist, Work, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import uuid
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
# bcrypt = Bcrypt(api)

##---------------------CLIENTS---------------------##

@api.route('/user_client', methods=['POST'])
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

    ## Hay que encriptar la contarseña en el front, así al enviar los datos al endpoint
    ## viene cifrada en el payload.

    new_user = User_Client(id = client_id, email = email, password = password, first_name = first_name, last_name = last_name)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201


@api.route('/user_client/<string:id>', methods=['GET'])
def get_client(id):
    client = User_Client.query.get_or_404(id)
    return jsonify(client.serialize()), 200

## Create PUT endpoint
@api.route('/user_client/<string:id>', methods=['PUT'])
def update_client(id):
    data = request.json
    client = User_Client.query.get_or_404(id)

    client.first_name = data.get("first_name", client.first_name)
    client.last_name = data.get("last_name", client.last_name)
    client.email = data.get("email", client.email)
    client.password = data.get("password", client.password)

    try:
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500

    return jsonify(client.serialize()), 200

##---------------------ARTISTS---------------------##

@api.route('/user_artist', methods=['POST'])
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
    ## Hay que encriptar la contarseña en el front, así al enviar los datos al endpoint
    ## viene cifrada en el payload.

    new_user = User_Artist(id = artist_id, email = email, password = password, first_name = first_name, 
                           last_name = last_name, description = description)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/user_artist/<string:id>', methods=['GET'])
def get_artist(id):
    artist = User_Artist.query.get_or_404(id)
    return jsonify(artist.serialize()), 200

@api.route('/user_artist/<string:id>', methods=['PUT'])
def update_artist(id):
    data = request.json
    artist = User_Artist.query.get_or_404(id)

    artist.first_name = data.get("first_name", artist.first_name)
    artist.last_name = data.get("last_name", artist.last_name)
    artist.email = data.get("email", artist.email)
    artist.password = data.get("password", artist.password)
    artist.description = data.get("description", artist.description)

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
    ## Maybe not needed
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
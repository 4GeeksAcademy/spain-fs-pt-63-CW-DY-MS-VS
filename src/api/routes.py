"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_Client, User_Artist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/user_client', methods=['POST', 'GET'])
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
    
    ## Hay que encriptar la contarseña en el front, así al enviar los datos al endpoint
    ## viene cifrada en el payload.

    new_user = User_Client(email = email, password = password, first_name = first_name, last_name = last_name)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/user_artist', methods=['POST', 'GET'])
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
    
    ## Hay que encriptar la contarseña en el front, así al enviar los datos al endpoint
    ## viene cifrada en el payload.

    new_user = User_Artist(email = email, password = password, first_name = first_name, 
                           last_name = last_name, description = description)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"Message": "Something went wrong", "Error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

## Crear tokens al hacer el incio de sesión

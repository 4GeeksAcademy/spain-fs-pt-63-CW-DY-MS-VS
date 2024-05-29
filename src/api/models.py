from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User_Client(db.Model):
    __tablename__ = 'user_client'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80),nullable=False)
    last_name = db.Column(db.String(80),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80),  nullable=False)
    
    

    def __repr__(self):
        return f'<User_Client {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "email": self.email
           
            # do not serialize the password, its a security breach
        }
    
class User_Artist(db.Model):
    __tablename__ = 'user_artist'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80),nullable=False)
    last_name = db.Column(db.String(80),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80),  nullable=False)
    description = db.Column(db.String(200), nullable=False)
    

    def __repr__(self):
        return f'<User_Artist {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "email": self.email,
            "description": self.description

            # do not serialize the password, its a security breach
        } 

class Work(db.Model):
    __tablename__ = 'work'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80),nullable=False)
    type = db.Column(db.String(80),nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(200),  nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer,nullable= False)
    artist_id = db.Column(db.Integer,db.ForeignKey('user_artist.id'), nullable=False)


    user_artist = db.relationship(User_Artist)

  

    def serialize(self):
        return {
            "id": self.id,
            "title":self.title,
            "type": self.type,
            "year" : self.year,
            "image":self.image,
            "description": self.description,
            "price":self.price,

        }  

class Favorites(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer,db.ForeignKey('user_client.id'), nullable = False )
    work_id = db.Column(db.Integer,db.ForeignKey('work.id'), nullable = False )

    user_client = db.relationship(User_Client)
    work = db.relationship(Work)

    def serialize(self):
        return {
            "id": self.id
        }  


class Shopping_Card(db.Model):
    __tablename__ = 'shopping_card'

    id = db.Column(db.Integer, primary_key=True)
    user_client_id = db.Column(db.Integer,db.ForeignKey('user_client.id'), nullable = False )
    work_id = db.Column(db.Integer,db.ForeignKey('work.id'), nullable = False )

    user_client = db.relationship(User_Client)
    work = db.relationship(Work)

    def serialize(self):
        return {
            "id": self.id
        }  
    

class Order(db.Model):
    id = db.Column(db.Integer,db.ForeignKey('user_client.id'), primary_key=True)

    user_client = db.relationship(User_Client)

    def serialize(self):
        return {
            "id": self.id
        }  






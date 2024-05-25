from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# flask instance
app = Flask(__name__)
CORS(app=app)

# file upload location
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"pdf"}

# setup database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:12345678@127.0.0.1:3306/auto_tag_web_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app=app)
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# flask instance
app = Flask(__name__)
CORS(app=app)

# setup database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:12345678@127.0.0.1:3306/auto_tag_web_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app=app)
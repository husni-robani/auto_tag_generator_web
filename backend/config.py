from flask import Flask
from flask_cors import CORS

# flask instance
app = Flask(__name__)
CORS(app=app)

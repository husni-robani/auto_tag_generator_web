from config import app, db
from models import Journal
from flask import request, jsonify

# creating cursor connection database

@app.route('/')
def index():
    journals = Journal.query.all()
    json_journals = list(map(lambda x: x.to_json(), journals)) 
    return jsonify({
        "journals": json_journals
    })
    # return "success"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
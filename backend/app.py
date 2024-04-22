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

@app.route('/api/create_journal', methods=["POST"])
def store():
    author = request.json.get("author")
    title = request.json.get("title")
    abstract = request.json.get("abstract")
    study_program = request.json.get("study_program")

    if not author or not abstract or not title or not study_program:
        return jsonify({
            "message": "you must include author, title, abstract, and study_program"
        }), 400
    
    new_journal = Journal(author=author, title=title, abstract=abstract, study_program=study_program)

    try:
        db.session.add(new_journal)
        db.session.commit()
    except Exception as e:
        return jsonify({
            "message": e
        }), 400
    
    return jsonify({
        "message": "Journal created!!!"
    }), 201




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
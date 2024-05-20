import os
import random
import string
from config import app, db
from models import Journal
from flask import request, jsonify
from werkzeug.utils import secure_filename

# creating cursor connection database

@app.route('/api/journals')
def index():
    journals = Journal.query.all()
    json_journals = list(map(lambda x: x.to_json(), journals))
    return jsonify({
        "journals": json_journals
    })

@app.route('/api/store_journal', methods=["POST"])
def store():
    author = request.form.get("author")
    title = request.form.get("title")
    abstract = request.form.get("abstract")
    study_program = request.form.get("study_program")
    if 'file' not in request.files:
        return jsonify({
            "message": "You must include file"
        }), 400
    file = request.files['file']

    # If the user does not select a file, browser may submit an empty part without filename
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    file_name =  ''.join(random.choices(string.ascii_lowercase, k=10)) + ".pdf"
    file.filename = file_name

    # filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    
    
    if not author or not abstract or not title or not study_program:
        return jsonify({
            "message": "you must include author, title, abstract, and study_program"
        }), 400
    

    new_journal = Journal(author=author, title=title, abstract=abstract, study_program=study_program, file_name=file_name)

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
import os
import random
import string
from config import app, db
from models import Journal
from flask import request, jsonify
from werkzeug.utils import secure_filename
import requests

# creating cursor connection database

@app.route('/api/journals')
def index():
    journals = Journal.query.order_by(Journal.timestamp.desc()).all()
    json_journals = list(map(lambda x: x.to_json(), journals))
    return jsonify({
        "journals": json_journals
    })

@app.route('/api/store_journal', methods=["POST"])
def store():
    author = request.form.get("author")
    title = request.form.get("title")
    abstract = request.form.get("abstract")
    # check author, title, and abstract
    if not author or not abstract or not title:
        return jsonify({
            "message": "you must include author, title, abstract, and study_program"
        }), 400
    
    # predict abstract
    response = requests.post(url="http://127.0.0.1:8080/api/predict",
                                 json={"abstracts": [abstract]},
                                 headers={"Content-Type": "application/json"})
    response.raise_for_status()
    if response.status_code != 200 and response.status_code != 201 and response.status_code != 202:
        app.logger.error(f"predicting abstract failed - status code {response.status_code}")
        return jsonify({
            "status": "error",
            "message": "creating new journal failed"
        })
    study_program = response.json()['results'][0]


    if 'file' not in request.files:
        return jsonify({
            "status": "error",
            "message": "You must include file"
        }), 400
    file = request.files['file']

    # If the user does not select a file, browser may submit an empty part without filename
    if file.filename == '':
        return jsonify({
            'status': "error",
            'message': 'No selected file'
            }), 400
    
    file_name =  ''.join(random.choices(string.ascii_lowercase, k=10)) + ".pdf"
    file.filename = file_name

    # filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Store journal to database
    new_journal = Journal(author=author, title=title, abstract=abstract, study_program=study_program, file_name=file_name)

    try:
        db.session.add(new_journal)
        db.session.commit()
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": e
        }), 400
    else:
        app.logger.info("Store journal to database success")
    
    return jsonify({
        "status": "success",
        "message": "Journal created!!!"
    }), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
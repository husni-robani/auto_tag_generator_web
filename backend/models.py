# config on this import is config file on the same directory
from config import db
class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80),  nullable=False, unique=False)
    author = db.Column(db.String(80), nullable=False, unique=False)
    abstract = db.Column(db.Text, nullable=False, unique=False)
    study_program = db.Column(db.Enum("Akuntansi", "Manajemen", "Teknik Informatika", "Teknik Industri", "Sistem Informasi"), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'abstract': self.abstract,
            'study_program': self.study_program
        }
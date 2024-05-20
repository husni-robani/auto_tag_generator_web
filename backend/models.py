# config on this import is config file on the same directory
from config import db
import datetime as dt
class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255),  nullable=False, unique=False)
    author = db.Column(db.String(80), nullable=False, unique=False)
    abstract = db.Column(db.Text, nullable=False, unique=False)
    study_program = db.Column(db.Enum("Akuntansi", "Manajemen", "Teknik Informatika", "Bahasa Inggris", "DKV"), nullable=False)
    file_name = db.Column(db.String(150), nullable=False, unique=True)
    timestamp = db.Column(db.TIMESTAMP, default=dt.datetime.utcnow)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'abstract': self.abstract,
            'study_program': self.study_program,
            'timestamp': self.timestamp.strftime("%B %d, %Y")
        }
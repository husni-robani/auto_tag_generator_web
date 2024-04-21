from config import app

@app.route('/')
def index():
    return "Success"


if __name__ == "__main__":
    app.run(debug=True)
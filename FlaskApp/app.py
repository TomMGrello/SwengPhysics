from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")

def main():
	return render_template("index.html")

if __name__ == "__main__":
    app.debug = True
    app.run(host=os.getenv('LISTEN', '0.0.0.0'))

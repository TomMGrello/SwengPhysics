from flask import Flask, render_template, json, request
import os

app = Flask(__name__)

@app.route("/")
def main():
	return render_template("index.html")

@app.route("/showPermissions")
def showPermissions():
	return render_template("showPermissions.html");

@app.route("/permissions",methods=['POST'])
def permissions():
	print('i am here')
	username = request.form['usernameInput']
	if username:
		return json.dumps({'html':'<span>' + username + '</span>'})
	return 'NOTHING!!!'

if __name__ == "__main__":
    app.debug = True
    app.run(host=os.getenv('LISTEN', '0.0.0.0'))

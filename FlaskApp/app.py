from flask import Flask, render_template, json, request, session, redirect, url_for,jsonify
from flask.ext.mysql import MySQL
import os

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'rowanphysicssweng'
app.config['MYSQL_DATABASE_DB'] = 'permissions'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

@app.route("/")
def main():
	return render_template("index.html")

@app.route("/showPermissions",methods=['GET'])
def showPermissions():
	return render_template("showPermissions.html");

@app.route("/storeUsername")
def storeUsername():
	username = request.args.get('user','N/A')
	session['username'] = username
	if username:
		print username
		return jsonify(result='Username is: ' + username)
	return 'No user found'
		
@app.route("/permissions",methods=['GET'])
def permissions():
	username = session['username']
	if username:
		perms = cursor.callproc('sp_get_permissions',username)
		return jsonify(result=perms)
	else:
		return "NO USERNAME"

if __name__ == "__main__":
	app.debug = True
	app.secret_key = 'rowanphysicssweng'
	app.run(host=os.getenv('LISTEN', '0.0.0.0'),threaded=True)

from flask import Flask, render_template, json, request, session, redirect, url_for, jsonify
from flaskext.mysql import MySQL
import os

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '0924'
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
	cursor.callproc('sp_get_banner_id',[username])
	banner_id = cursor.fetchall()[0][0] #data is returned as ((<banner_id>,),) for some reason. So this extracts it.
	print banner_id
	session['banner_id'] = banner_id
	if username:
		print username
		return jsonify(result='Username is: ' + username)
	return 'No user found'

@app.route("/permissions",methods=['GET'])
def permissions():
	banner_id = session['banner_id']
	print 'BANNER FOR RETREIVAL: ' + str(banner_id)
	if banner_id:
		cursor.callproc('sp_get_permissions',[banner_id])
		perms = cursor.fetchall()
		print perms
		return jsonify(result=perms)
	else:
		return "NO BANNER ID"

if __name__ == "__main__":
	app.debug = True
	app.secret_key = 'rowanphysicssweng'
#	app.run(host=os.getenv('LISTEN', '0.0.0.0'),threaded=True)
	app.run(threaded=True)

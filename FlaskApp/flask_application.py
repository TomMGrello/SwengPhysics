from flask import Flask, render_template, json, request, session, redirect, url_for, jsonify
from flaskext.mysql import MySQL
import os

flask_application = Flask(__name__)
mysql = MySQL()

flask_application.config['MYSQL_DATABASE_USER'] = 'root'
flask_application.config['MYSQL_DATABASE_PASSWORD'] = '0924'
flask_application.config['MYSQL_DATABASE_DB'] = 'permissions'
flask_application.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(flask_application)

conn = mysql.connect()

@flask_application.route("/")
def main():
	return render_template("index.html")

@flask_application.route("/showPermissions",methods=['GET'])
def showPermissions():
	return render_template("showPermissions.html");

@flask_application.route("/adminPage",methods=['GET'])
def adminPage():
	return render_template("UpdatedAdminPage.html");

@flask_application.route("/storeUsername")
def storeUsername():
	result = "No user found"
	cursor = conn.cursor()

	username = request.args.get('user','N/A')
	session['username'] = username
	cursor.callproc('sp_get_banner_id',[username])

	banner_id = cursor.fetchall()[0][0] #data is returned as ((<banner_id>,),) for some reason. So this extracts it.
	print banner_id
	session['banner_id'] = banner_id

	if username:
		print username
		result = jsonify(result='Username is: ' + username)

	cursor.close()
	return result

@flask_application.route("/permissions",methods=['GET'])
def permissions():
	cursor = conn.cursor()
	result = "No banner id"
	banner_id = session['banner_id']

	print 'BANNER FOR RETREIVAL: ' + str(banner_id)

	if banner_id:
		cursor.callproc('sp_get_permissions',[banner_id])
		perms = cursor.fetchall()
		print perms
		result = jsonify(result=perms)

	cursor.close()
	return result

if __name__ == "__main__":
	flask_application.debug = True
	flask_application.secret_key = 'rowanphysicssweng'
	#flask_application.run(host=os.getenv('LISTEN', '0.0.0.0'),threaded=True)
	flask_application.run(threaded=True)

###########################################################################################
########################################  IMPORTS  ########################################
###########################################################################################

from flask import Flask, render_template, json, request, session, redirect, url_for, jsonify
from flaskext.mysql import MySQL
import os

###########################################################################################
##################################### ERROR CONSTANTS #####################################
###########################################################################################

NO_BANNER_ID_ERROR = 'DB_BANNER_ERROR'
SUCCESS = 'SUCCESS'
MISSING_INPUT = 'INPUT_NOT_SUPPLIED'
NO_REQUESTS = 'NO_REQUESTS'
INCORRECT_PERMISSIONS = 'INCORRECT_PERMISSIONS'

###########################################################################################
########################################   INITS   ########################################
###########################################################################################

flask_application = Flask(__name__)
mysql = MySQL()

flask_application.config['MYSQL_DATABASE_USER'] = 'root'

flask_application.config['MYSQL_DATABASE_PASSWORD'] = 'rowanphysicssweng'   # todo, change back to rowanphysicssweng for push, change to personal password for dev work

flask_application.config['MYSQL_DATABASE_DB'] = 'permissions'
flask_application.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(flask_application)

conn = mysql.connect()


###########################################################################################
############################   WEBPAGE ENDPOINTS   ########################################
###########################################################################################

@flask_application.route("/")
def main():
	return render_template("index.html")

@flask_application.route("/showPermissions",methods=['GET'])
def showPermissions():
	return render_template("showPermissions.html");

@flask_application.route("/adminPage",methods=['GET'])
def adminPage():
	return render_template("AdminPage.html");

@flask_application.route("/PermissionsForAdminPage",methods=['GET'])
def PermissionsForAdminPage():
	return render_template("PermissionsForAdminPage.html");

@flask_application.route("/manageUser",methods=['GET'])
def ManageUser():
	return render_template("ManageUser.html");

@flask_application.route("/requestAccess",methods=['GET'])
def RequestAccess():
	return render_template("RequestAccess.html");

###########################################################################################
##############################   QUERY ENDPOINTS   ########################################
###########################################################################################

@flask_application.route("/login",methods=['GET'])
def login():
	result = MISSING_INPUT
	cursor = conn.cursor()

	username = request.args.get('user','N/A')
	if username:
		result = SUCCESS
		session['username'] = username
		cursor.callproc('sp_get_banner_id',[username])

		banner_id = cursor.fetchall()[0][0] #data is returned as ((<banner_id>,),). The [0][0] extracts it.

		if banner_id != "Username not found":
			session['banner_id'] = banner_id
		else:
			result = NO_BANNER_ID_ERROR

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/addUserRequest",methods=['GET','POST'])
def addUserRequest():
	result = MISSING_INPUT
	first_name = request.args.get('first_name')
	middle_name = request.args.get('middle_name')
	last_name = request.args.get('last_name')
	username = request.args.get('username')
	banner_id = request.args.get('banner_id')
	role = request.args.get('role')
	email = request.args.get('email')
	cursor = conn.cursor()
	print "RUNNING ADD USER REQUEST"

	if banner_id and first_name and last_name and role:
		result = SUCCESS
		cursor.callproc('sp_add_user_request',[banner_id,first_name,middle_name,last_name,username,role,email])

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/deleteUserRequest",methods=['GET'])
def deleteUserRequest():
	result = INCORRECT_PERMISSIONS
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[2];

	if int(can_add_user) == 1:
		result = MISSING_INPUT
		banner_id = request.args.get('banner_id')
		role = request.args.get('role')


		if banner_id and role:
			result = SUCCESS
			cursor.callproc('sp_delete_user_request',[banner_id, role])

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/acceptUserRequest",methods=['GET'])
def acceptUserRequest():
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[2];

	if int(can_add_user) == 1:
		banner_id = request.args.get('banner_id')
		first_name = request.args.get('first_name')
		middle_name = request.args.get('middle_name')
		last_name = request.args.get('last_name')
		username = request.args.get('user')
		role = request.args.get('role')
		email = request.args.get('email')



		options = { 'student':(0,0,0,1,1,1,1,0,0),
					'professor':(0,0,0,1,0,0,0,0,0),
					'lab_admin':(1,1,1,1,1,1,1,1,1),
					'sys_admin':(0,0,0,0,0,0,0,1,1)}

		perms = options[role]

		cursor.callproc('sp_add_user',[banner_id, first_name, middle_name, last_name, username, role, email])
		cursor.callproc('sp_change_permissions',[banner_id,perms[0],perms[1],perms[2],perms[3],perms[4],perms[5],perms[6],perms[7],perms[8]])
		cursor.callproc('sp_delete_user_request',[banner_id,role])
		result = SUCCESS
	return jsonify(result=result)

@flask_application.route("/addUser",methods=['GET','POST'])
def addUser():
	result = MISSING_INPUT
	result = INCORRECT_PERMISSIONS
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[2];

	if int(can_add_user) == 1:
		banner_id = int(request.args.get('banner_id'))
		first_name = request.args.get('first_name')
		middle_name = request.args.get('middle_name')
		last_name = request.args.get('last_name')
		username = request.args.get('user')
		role = request.args.get('role')
		email = request.args.get('email')
		cursor = conn.cursor()

		result = SUCCESS
		cursor.callproc('sp_add_user',[banner_id, first_name, middle_name, last_name, username, role, email])
		result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/changePermissions",methods=['GET'])
def changePermissions():
	cursor - conn.cursor()
	result = 'FAIL'

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_permissions = user_permissions[4]

	if can_modify_permissions == 1:
		result = MISSING_INPUT
		banner_id = request.args.get('banner_id')
		can_add_user = request.args.get('can_add_user')
		can_remove_user = request.args.get('can_remove_user')
		can_modify_permissions = request.args.get('can_modify_permissions')
		can_request_record = request.args.get('can_request_record')
		can_add_record = request.args.get('can_add_record')
		can_modify_record = requests.args.get('can_modify_record')
		can_remove_record = requests.args.get('can_remove_record')
		can_backup_database = requests.args.get('can_backup_database')
		can_restore_database = requests.args.get('can_restore_database')

	if banner_id and can_add_user and can_remove_user and can_modify_permissions and can_request_record and can_add_record and can_modify_record and can_remove_record and can_backup_database and can_restore_database:
		result = SUCCESS
		cursor.callproc('sp_change_permissions',[banner_id, can_add_user, can_remove_user, can_modify_permissions, can_request_record, can_add_record, can_modify_record, can_remove_record, can_backup_database, can_restore_database])

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/permissions",methods=['GET'])
def permissions():
	cursor = conn.cursor()
	result = NO_BANNER_ID_ERROR
	banner_id = session['banner_id']

	print 'BANNER FOR RETREIVAL: ' + str(banner_id)

	if banner_id:
		cursor.callproc('sp_get_permissions',[banner_id])
		perms = cursor.fetchall()[0]
		print perms
		result = perms

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/signout",methods=['GET'])
def signout():
	session.clear();
	return jsonify(result="CLEARED");

@flask_application.route("/getAllUserRequests",methods=['GET'])
def getAllUserRequests():
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[2]

	if int(can_add_user) == 1:
		print "allowed"
		cursor.callproc('sp_get_all_user_requests',[])
		requests = cursor.fetchall()
		print requests
		result = requests

	cursor.close()
	return jsonify(result=result)

if __name__ == "__main__":
	flask_application.debug = True
	flask_application.secret_key = 'rowanphysicssweng'
	flask_application.run(host=os.getenv('LISTEN', '0.0.0.0'))

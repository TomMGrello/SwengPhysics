###########################################################################################
########################################  IMPORTS  ########################################
###########################################################################################

from flask import Flask, render_template, json, request, session, redirect, url_for, jsonify, g
from flaskext.mysql import MySQL
import os
import platform
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import time
from datetime import datetime, timedelta
import spreadsheet
from pycas import *
import xml.etree.ElementTree as ET

###########################################################################################
##################################### ERROR CONSTANTS #####################################
###########################################################################################

NO_BANNER_ID_ERROR = 'DB_BANNER_ERROR'
SUCCESS = 'SUCCESS'
MISSING_INPUT = 'INPUT_NOT_SUPPLIED'
NO_REQUESTS = 'NO_REQUESTS'
INCORRECT_PERMISSIONS = 'INCORRECT_PERMISSIONS'
ERROR = 'ERROR'
NO_PERMISSIONS = 'NO PERMISSIONS FOUND'
NO_USERS = 'NO USERS FOUND'

###########################################################################################
##################################### PERMS INDECES #######################################
###########################################################################################

CAN_ADD_USER_INDEX = 2
CAN_REMOVE_USER_INDEX = CAN_ADD_USER_INDEX + 1
CAN_MODIFY_PERMISSIONS_INDEX = CAN_REMOVE_USER_INDEX + 1
CAN_REQUEST_RECORD_INDEX = CAN_MODIFY_PERMISSIONS_INDEX + 1
CAN_ADD_RECORD_INDEX = CAN_REQUEST_RECORD_INDEX + 1
CAN_REMOVE_RECORD_INDEX = CAN_ADD_RECORD_INDEX + 1
CAN_MODIFY_RECORD_INDEX = CAN_REMOVE_RECORD_INDEX + 1
CAN_BACKUP_DATABASE_INDEX = CAN_MODIFY_RECORD_INDEX + 1
CAN_RESTORE_DATABASE_INDEX = CAN_BACKUP_DATABASE_INDEX + 1

###########################################################################################
########################################   INITS   ########################################
###########################################################################################

flask_application = Flask(__name__)
mysql = MySQL()
flask_application.config['UPLOAD_FOLDER'] = '/var/www/html/physics/lab/static/lab_pdfs'
ALLOWED_EXTENSIONS = set(['pdf'])
flask_application.config['MYSQL_DATABASE_USER'] = 'physics_user'
flask_application.config['MYSQL_DATABASE_PASSWORD'] = 'rowanphysics2017'
flask_application.config['MYSQL_DATABASE_DB'] = 'physicslab'
flask_application.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(flask_application)

def connect_db():
	conn = mysql.connect()
	return conn

def get_db():
	if not hasattr(g, 'physics'):
		g.physics = connect_db()
	return g.physics

@flask_application.teardown_appcontext
def close_db(_):
    if hasattr(g, 'physics'):
        g.physics.close()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

app_login_url = 'https://rucsm.org/physics/lab'
cas_url = 'https://login.rowan.edu/cas'
cas_client = CASClient(cas_url, auth_prefix='')


###########################################################################################
############################   WEBPAGE ENDPOINTS   ########################################
###########################################################################################

@flask_application.route("/")
@flask_application.route("/index")
def main():
	if session.has_key('logged-in'):
		return redirect(url_for('signout'))
	ticket = request.args.get('ticket')
    	cas_response = None
	if ticket:
        	try:
            		cas_response = cas_client.perform_service_validate(
                	ticket=ticket,
                	service_url=app_login_url,
                	)
        	except:
            		# CAS server is currently broken, try again later.
            		return redirect(url_for('/index'))
        #if cas_response and cas_response.success:
        if cas_response:
            	session['logged-in'] = True
		return checkLogin(cas_response.user)
	if session.has_key('logged-in'):
		del(session['logged-in'])
    	cas_login_url = cas_client.get_login_url(service_url=app_login_url)
    	return redirect(cas_login_url)

def checkLogin(username):
	cursor = get_db().cursor()
	cursor.callproc('sp_get_banner_id',[username])
	result = cursor.fetchall()
	#print "RESULT: " + str(result[0][0])
	if result[0][0] == 'Username not found':
		session['username_to_add'] = username
		return redirect(url_for('RequestAccess'))
	else:
		session['banner_id'] = result
		cursor.callproc('sp_get_email',[result])
		email = cursor.fetchall()[0][0]
		session['email'] = email
		return redirect(url_for('mainInventoryView'))
	
@flask_application.route("/manageLabRequest",methods=['GET'])
def manageLabRequest():
	cursor = get_db().cursor()
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX];

	if int(can_remove_record) == 1:
		return render_template("labsDemosRequests.html");
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/requestLab",methods=['GET'])
def requestLab():
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	return render_template("requestLab.html");

@flask_application.route("/systemVariables",methods=['GET'])
def systemVariables():
	cursor = get_db().cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("systemVariables.html")
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/manageConcepts",methods=['GET'])
def manageConcepts():
	cursor = get_db().cursor()
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("manageConcepts.html");
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/uploadDatabase",methods=['GET'])
def uploadDatabase():
	conn = get_db()
	cursor = conn.cursor()


	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("uploadDatabase.html")
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/manageInventoryRequests",methods=['GET'])
def manageInventoryRequests():
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	conn = get_db()
	cursor = conn.cursor()

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("inventoryRequests.html")
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/requestInventory",methods=['GET'])
def requestInventory():
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	conn = get_db()
	cursor = conn.cursor()

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_request_record = user_permissions[CAN_REQUEST_RECORD_INDEX];

	if int(can_request_record) == 1:
		return render_template("requestInventory.html")
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/inventory",methods=['GET'])
def mainInventoryView():
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	conn = get_db()
	cursor = conn.cursor()


	if session.has_key('banner_id') == False:
		return render_template("index.html")

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("new_admin_inventory.html")
	else:
		return render_template("new_nonadmin_inventory.html")


@flask_application.route("/manageUserPermissions",methods=['GET'])
def manageUserPermissions():
	cursor = get_db().cursor()
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_permissions = user_permissions[CAN_MODIFY_PERMISSIONS_INDEX];

	if int(can_modify_permissions) == 1:
		return render_template("manageUserPermissions.html");
	else:
		return redirect(url_for('insufficientPermissions'))

@flask_application.route("/labsAndDemos",methods=['GET'])
def labsAndDemos():
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))
	conn = get_db()
	cursor = conn.cursor()

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];
	if(int(can_modify_record) == 1):
		return render_template("viewLabsAndDemos.html");
	else:
		return render_template("viewLabsAndDemosNonAdmin.html")

@flask_application.route("/manageUserRequests",methods=['GET'])
def ManageUser():
	cursor = get_db().cursor()
	if session.has_key('banner_id') == False:
		return redirect(url_for('main'))

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX];

	if int(can_add_user) == 1:
		return render_template("manageNewUserRequests.html");
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/requestAccess",methods=['GET'])
def RequestAccess():
	return render_template("RequestAccess.html");

@flask_application.route("/test",methods=['GET'])
def test():
	return render_template("test.html");

###########################################################################################
##############################   QUERY ENDPOINTS   ########################################
###########################################################################################

@flask_application.route("/login",methods=['GET'])
def login_user():
	result = MISSING_INPUT
	conn = get_db()
	cursor = conn.cursor()

	username = request.args.get('user','N/A')
	if username:
		result = SUCCESS
		session['username'] = username
		cursor.callproc('sp_get_banner_id',[username])

		banner_id = cursor.fetchall()[0][0] #data is returned as ((<banner_id>,),). The [0][0] extracts it.

		if banner_id != "Username not found":
			session['banner_id'] = banner_id
			cursor.callproc('sp_get_email',[banner_id])
			email = cursor.fetchall()[0][0]
			if email != "Email not found":
				session['email'] = email
		else:
			result = NO_BANNER_ID_ERROR

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/addUserRequest",methods=['GET','POST'])
def addUserRequest():
	conn = get_db()
	result = MISSING_INPUT
	first_name = request.args.get('first_name')
	middle_name = request.args.get('middle_name')
	last_name = request.args.get('last_name')
	username = request.args.get('username')
	banner_id = request.args.get('banner_id')
	role = request.args.get('role')
	email = request.args.get('email')
	cursor = conn.cursor()

	if banner_id and first_name and last_name and role:
		result = SUCCESS
		cursor.callproc('sp_add_user_request',[banner_id,first_name,middle_name,last_name,username,role,email])

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/deleteUserRequest",methods=['GET'])
def deleteUserRequest():
	result = INCORRECT_PERMISSIONS
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX];

	if int(can_add_user) == 1:
		result = MISSING_INPUT
		banner_id = request.args.get('banner_id')
		role = request.args.get('role')


		if banner_id and role:
			result = SUCCESS
			cursor.callproc('sp_delete_user_request',[banner_id, role])

		cursor.close()
		return jsonify(result=result)
	else:
                cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/acceptUserRequest",methods=['GET'])
def acceptUserRequest():
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX];

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
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/addUser",methods=['GET','POST'])
def addUser():
	result = MISSING_INPUT
	result = INCORRECT_PERMISSIONS
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX];

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
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))	

@flask_application.route("/changePermissions",methods=['GET'])
def changePermissions():
	conn = get_db()
	cursor = conn.cursor()
	result = 'FAIL'

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_permissions = user_permissions[CAN_MODIFY_PERMISSIONS_INDEX]
	if can_modify_permissions == 1:
		result = MISSING_INPUT
		banner_id = request.args.get('banner_id')
		can_add_user = request.args.get('can_add_user')
		can_remove_user = request.args.get('can_remove_user')
		can_modify_permissions = request.args.get('can_modify_permissions')
		can_request_record = request.args.get('can_request_record')
		can_add_record = request.args.get('can_add_record')
		can_modify_record = request.args.get('can_modify_record')
		can_remove_record = request.args.get('can_remove_record')
		can_backup_database = request.args.get('can_backup_database')
		can_restore_database = request.args.get('can_restore_database')
	else:
                return redirect(url_for('insufficientPermissions'))

	if banner_id and can_add_user and can_remove_user and can_modify_permissions and can_request_record and can_add_record and can_modify_record and can_remove_record and can_backup_database and can_restore_database:
		result = SUCCESS
		cursor.callproc('sp_change_permissions',[banner_id, can_add_user, can_remove_user, can_modify_permissions, can_request_record, can_add_record, can_modify_record, can_remove_record, can_backup_database, can_restore_database])
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/permissions",methods=['GET'])
def permissions():
	conn = get_db()
	cursor = conn.cursor()
	result = NO_BANNER_ID_ERROR
	banner_id = session['banner_id']

	if banner_id:
		cursor.callproc('sp_get_permissions',[banner_id])
		perms = cursor.fetchall()[0]
		print perms
		result = perms

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/signout",methods=['GET'])
def signout():
	session.clear()
	if(session.has_key('logged-in')):
		del(session['logged-in'])
    	cas_logout_url = cas_client.get_logout_url(service_url=app_login_url)
    	return redirect(cas_logout_url)

@flask_application.route("/getAllUserRequests",methods=['GET'])
def getAllUserRequests():
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX]

	if int(can_add_user) == 1:
		cursor.callproc('sp_get_all_user_requests',[])
		requests = cursor.fetchall()
		result = requests

		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/allUserPermissions",methods=['GET'])
def allUserPermissions():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_MODIFY_PERMISSIONS_INDEX];
	result = NO_PERMISSIONS

	if permission == 1:
		cursor.callproc('sp_get_all_permissions')
		all_permissions = cursor.fetchall()
		result = jsonify(result=all_permissions)
		cursor.close()
		return result
	else:	
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/getAllUsers",methods=['GET'])
def getAllUsers():
	conn = get_db()
	cursor = conn.cursor()
	result = NO_USERS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_permissions = user_permissions[CAN_MODIFY_PERMISSIONS_INDEX];

	if int(can_modify_permissions) == 1:
		cursor.callproc('sp_get_all_users')
		all_users = cursor.fetchall()
		result = jsonify(result=all_users)
		cursor.close()
		return result
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/addInventoryItem",methods=['GET'])
def addInventoryItem():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	canAddRecord = user_permissions[CAN_ADD_RECORD_INDEX];
	if int(canAddRecord) == 1:
		name = request.args.get('name')
		serial = request.args.get('serial_num')
		hashed_serial = hash(serial)
		invoice_id = request.args.get('invoice_id') #int
		purchase_date = request.args.get('purchase_date')
		price = request.args.get('price') #float
		vendor_name = request.args.get('vendor_name')
		location_id = request.args.get('location_id')
		shelf = request.args.get('shelf')
		quantity = request.args.get('quantity') #int
		cursor.callproc('sp_add_inventory_item',[name, serial, int(hashed_serial), int(invoice_id), purchase_date, float(price), vendor_name, location_id, shelf, int(quantity)])
		cursor.fetchall()
		result = SUCCESS

		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/getLab",methods=['GET'])
def getLab():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS
	cursor.callproc('sp_get_lab_by_id',[int(request.args.get('lab_id'))])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/getItem",methods=['GET'])
def getItem():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS
	cursor.callproc('sp_get_item_by_serial',[hash(request.args.get('serial_num'))])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/getLabItems",methods=['GET'])
def getLabItems():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS
	cursor.callproc('sp_get_items_by_lab_id',[int(request.args.get('lab_id'))])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/getAssociatedLabs",methods=['GET'])
def getAssociatedLabs():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS
	cursor.callproc('sp_get_associated_labs',[hash(request.args.get('serial_num'))])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/modifyInventoryItem",methods=['GET'])
def modifyInventoryItem():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	canModifyRecord = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(canModifyRecord) == 1:
		name = request.args.get('name')
		serial = request.args.get('serial_num')
		hashed_serial = hash(serial)
		location_id = request.args.get('location_id')
		quantity = request.args.get('quantity')
		shelf = request.args.get('shelf')
		invoice_id = request.args.get('invoice_id')
		price = request.args.get('price')

		cursor.callproc('sp_add_inventory_item',[name, serial, int(hashed_serial), int(invoice_id), None, float(price), None, location_id, shelf, int(quantity)])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/removeInventoryItem",methods=['GET'])
def removeInventoryItem():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	canRemoveRecord = user_permissions[CAN_REMOVE_RECORD_INDEX]

	if int(canRemoveRecord) == 1:
		serial = request.args.get('serial_num')
		hashed_serial = hash(serial)
		cursor.callproc('sp_remove_inventory_item', [int(hashed_serial)])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/getUser",methods=['GET'])
def getUser():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])
	permissions = cursor.fetchall()[0]
	canModifyPermissions = permissions[CAN_MODIFY_PERMISSIONS_INDEX]

	if int(canModifyPermissions) == 1:
		userBanner = request.args.get('banner_id')
		cursor.callproc('sp_get_permissions', [int(userBanner)])
		user_permissions = cursor.fetchall()
		result = jsonify(result=user_permissions)
		cursor.close()
		return result
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/removeUser",methods=['GET'])
def removeUser():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	canRemoveUser = user_permissions[CAN_REMOVE_USER_INDEX]

	if int(canRemoveUser) == 1:
		banner_id = request.args.get('banner_id')
		cursor.callproc('sp_remove_user', [int(banner_id)])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/getFilteredInventory",methods=['GET'])
def getFilteredInventory():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS

	name = request.args.get('name')
	if name == "":
		name = None
	vendor_name = request.args.get('vendor_name')
	if vendor_name == "":
		vendor_name = None
	location_id = request.args.get('location_id')
	if location_id == "":
		location_id = None
	shelf = request.args.get('shelf')
	if shelf == "":
		shelf = None
	order_by = request.args.get('order_by')
	asc_or_desc = 0
	prev_sort_field = ""
	if session.has_key('prev_sort_field') == True:
		prev_sort_field = session['prev_sort_field']
		asc_or_desc = session['asc_or_desc']
	if prev_sort_field == order_by:
		if asc_or_desc == 0:
			asc_or_desc = 1
		else:
			asc_or_desc = 0
	else:
		session['prev_sort_field'] = order_by
	session['asc_or_desc'] = asc_or_desc
	cursor.callproc('sp_get_filtered_inventory_items',[name,None,vendor_name,location_id,shelf,order_by,asc_or_desc])

	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/getFilteredLabsDemos",methods=['GET'])
def getFilteredLabsDemos():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS

	name = request.args.get('name')
	if name == "":
		name = None
	input_type = request.args.get('input_type')
	if input_type == "":
		input_type = None
	topic = request.args.get('topic')
	if topic == "":
		topic = None
	concept = request.args.get('concept')
	if concept == "":
		concept = None
	subconcept = request.args.get('subconcept')
	if subconcept == "":
		subconcept = None

	order_by = request.args.get('order_by')
	asc_or_desc = 0
	prev_sort_field = ""
	if session.has_key('prev_sort_field') == True:
		prev_sort_field = session['prev_sort_field']
		asc_or_desc = session['asc_or_desc']
	if prev_sort_field == order_by:
		if asc_or_desc == 0:
			asc_or_desc = 1
		else:
			asc_or_desc = 0
	else:
		session['prev_sort_field'] = order_by
	session['asc_or_desc'] = asc_or_desc

	cursor.callproc('sp_get_filtered_labs_demos',[input_type,name,topic,concept,subconcept,order_by,asc_or_desc])

	result = cursor.fetchall()
	cursor.close()

	return jsonify(result=result)

@flask_application.route("/updateConstants",methods=['GET'])
def updateConstants():
	conn = get_db()
	cursor = conn.cursor()
	result = ERROR
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_MODIFY_RECORD_INDEX]

	if int(permission) == 1:
		auto_accept = request.args.get('auto_accept')
		required_num_teams = request.args.get('required_num_teams')
		start_date = request.args.get('semester_start_date')
		end_date = request.args.get('semester_end_date')
		cursor.callproc('sp_update_constants', [auto_accept,required_num_teams,start_date,end_date])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/addItemToLab",methods=['GET'])
def addItemToLab():
	conn = get_db()
	cursor = conn.cursor()

	quantity = request.args.get('quantity')
	serial_num = request.args.get('serial_num')
	lab_id = request.args.get('lab_id')

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX]
	if can_add_record == 1:
		cursor.callproc('sp_add_item_to_lab_demo',[lab_id,hash(serial_num),quantity])
		cursor.fetchall()
		result = SUCCESS

		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/removeLab",methods=['GET'])
def removeLab():
	conn = get_db()
	cursor = conn.cursor()

	lab_id = request.args.get('lab_id')

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		result = SUCCESS
		cursor.callproc('sp_remove_lab',[lab_id])
		cursor.fetchall()

		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

	#Using Google's SMTP server. This requires a "no-reply" account to be created on GMail for our
	#application to work correctly.
def sendEmail(toaddr,body,subject):
	email_server = smtplib.SMTP('smtp.gmail.com',587)
	email_server.ehlo()
	email_server.starttls()
	fromaddr = 'emailtesterphysics@gmail.com'
	msg = MIMEText(body)
	msg['From'] = fromaddr
	msg['To'] = toaddr
	msg['Subject'] = subject
	text = msg.as_string()
	email_server.login("emailtesterphysics@gmail.com","ttteeesssttt")
	email_server.sendmail(fromaddr,toaddr,text)
	email_server.quit()

@flask_application.route("/addLabRequest",methods=['GET'])
def addLabRequest():
	conn = get_db()
	result = MISSING_INPUT
	lab_id = request.args.get('lab_id')
	dates = request.args.get('dates')
	time_needed = request.args.get('time')
	location_id = request.args.get('location_id')
	classroom = request.args.get('classroom')
	banner_id = session['banner_id']
	num_teams = request.args.get('num_teams')
	notes = request.args.get('notes')
	lab_name = request.args.get('lab_name')
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_request_record = user_permissions[CAN_REQUEST_RECORD_INDEX]

	cursor.callproc('sp_get_all_constants',[])
	auto_accept = cursor.fetchall()[0][1]
	if can_request_record == 1:
		cursor.callproc('sp_add_lab_request',[lab_id,dates,time_needed,location_id,banner_id,num_teams,notes])
		request_id = cursor.fetchall()[0][0]
		result = SUCCESS
		if auto_accept == 0:
			toaddr = session['email']
			body = 'Your lab/demo request has been received.\nYou will receive a notification when your request is approved or denied.\n\n'
			lab_info = "TITLE: " + lab_name + "\n"
			lab_info += "DATE(S) NEEDED: " + dates + "\n"
			lab_info += "CLASSROOM: " + classroom + "\n"
			lab_info += "NUMBER OF TEAMS: " + num_teams + "\n"
			lab_info += "ADDITIONAL NOTES: " + notes + "\n"
			body += lab_info

			#get some sort of unique email Subject
			email_id = toaddr + dates + lab_name
			email_id = str(abs(hash(email_id)))

			subject = 'Physics request #' + email_id
			sendEmail(toaddr,body,subject)
		else:
			acceptRequest(request_id)
		cursor.close()
		return jsonify(result=result)

	else:
                return redirect(url_for('insufficientPermissions'))

def acceptRequest(request_id):
	conn = get_db()
	result = MISSING_INPUT
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]

	cursor.callproc('sp_get_all_constants',[])
	auto_accept = cursor.fetchall()[0][1]

	if can_remove_record == 1 or auto_accept == 1:
		cursor.callproc('sp_get_lab_request_by_id',[request_id])
		request_data = cursor.fetchall()[0]
		dates = request_data[2]
		time_needed = request_data[3]
		classroom = request_data[15] + " " + request_data[16]
		banner_id = request_data[5]
		num_teams = request_data[6]
		notes = request_data[7]
		lab_name = request_data[10]
		cursor.callproc('sp_delete_lab_request',[request_id])
		cursor.fetchall()
		result = SUCCESS
		
		cursor.callproc('sp_get_user',[banner_id])
		user_obj = cursor.fetchall()[0]
		username = user_obj[2] + " " + user_obj[4]

		cursor.callproc('sp_get_email',[int(banner_id)])

		toaddr = cursor.fetchall()[0][0]

		body = 'Your request for the following lab has been approved:\n\n'
		lab_info = "TITLE: " + lab_name + "\n"
		lab_info += "DATE(S) NEEDED: " + dates + "\n"
		lab_info += "CLASSROOM: " + classroom + "\n"
		lab_info += "NUMBER OF TEAMS: " + str(num_teams) + "\n"
		body += lab_info

		#get some sort of unique email Subject
		email_id = toaddr + dates + lab_name
		email_id = str(abs(hash(email_id)))

		subject = 'Physics request accepted #' + email_id
		sendEmail(toaddr,body,subject)

		result = SUCCESS
	
		spreadsheet.exportInventory([dates,"Test",time_needed,classroom,num_teams,username,notes,toaddr])

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/acceptLabRequest",methods=['GET'])
def acceptLabRequest():
	conn = get_db()
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if permission == 1:
		return acceptRequest(request.args.get('request_id'))
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/rejectLabRequest",methods=['GET'])
def rejectLabRequest():
	conn = get_db()
	result = MISSING_INPUT
	request_id = request.args.get('request_id')
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		cursor.callproc('sp_get_lab_request_by_id',[request_id])
		request_data = cursor.fetchall()[0]
		dates = request_data[2]
		time_needed = request_data[3]
		classroom = request_data[15] + " " + request_data[16]
		banner_id = request_data[5]
		num_teams = request_data[6]
		lab_name = request_data[10]
		cursor.callproc('sp_delete_lab_request',[request_id])
		cursor.fetchall()
		result = SUCCESS

		cursor.callproc('sp_get_email',[int(banner_id)])

		toaddr = cursor.fetchall()[0][0]
		body = 'Your request for the following lab has been rejected:\n\n'
		lab_info = "TITLE: " + lab_name + "\n"
		lab_info += "DATE(S) NEEDED: " + dates + "\n"
		lab_info += "CLASSROOM: " + classroom + "\n"
		lab_info += "NUMBER OF TEAMS: " + str(num_teams) + "\n"
		body += lab_info
		#get some sort of unique email Subject
		email_id = toaddr + dates + lab_name
		email_id = str(abs(hash(email_id)))
		subject = 'Physics request rejected #' + email_id
		sendEmail(toaddr,body,subject)

		result = SUCCESS

		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/getAllLabRequests",methods=['GET'])
def getAllLabRequests():
	conn = get_db()
	result = MISSING_INPUT
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		cursor.callproc('sp_get_all_lab_requests',[])
		result = cursor.fetchall()

		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/uploadFile",methods=['GET', 'POST'])
def uploadFile():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		if request.method == 'POST':
			f = request.files['file']

			name = request.form['name']
			input_type = request.form['type']
			topic = request.form['topic']
			concept = request.form['concept']
			subconcept = request.form['subconcept']
			if subconcept == "" or subconcept == None or subconcept == "-1":
				subconcept = None
			lab_id = request.form['lab_id']
			if lab_id == '':
				lab_id = None

			#The result will be the newly added lab_id
			addResult = addLab(input_type,name,topic,concept,subconcept,lab_id)

			try:
				int(addResult[0][0])
			except ValueError:
				return "Add failed"

			filename = str(addResult[0][0]) + ".pdf"

			if f.filename == '': #no change made to file, don't save any files
				return redirect(url_for('labsAndDemos'))

			if f and allowed_file(f.filename):
				f.save(os.path.join(flask_application.config['UPLOAD_FOLDER'], filename))
				return redirect(url_for('labsAndDemos'))
			return 'file type not supported. try again with a PDF'
		return "<br>".join(os.listdir(flask_application.config['UPLOAD_FOLDER'],))
	return "INCORRECT_PERMISSIONS"

def addLab(input_type,name,topic,concept,subconcept,lab_id):
	conn = get_db()
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX]
	if can_add_record == 1:
		cursor.callproc('sp_add_lab',[input_type,name,topic,concept,subconcept,lab_id])
		result = cursor.fetchall()

	return result

#START Inventory requests
@flask_application.route("/addInventoryRequest",methods=['GET'])
def addInventoryRequest():
	conn = get_db()
	result = MISSING_INPUT
	serial_num = request.args.get('serial_num')
	dates = request.args.get('dates')
	time_needed = request.args.get('time')
	classroom = request.args.get('classroom')
	banner_id = session['banner_id']
	num_teams = request.args.get('num_teams')
	notes = request.args.get('notes')
	item_name = request.args.get('item_name')
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_request_record = user_permissions[CAN_REQUEST_RECORD_INDEX]

	if can_request_record == 1:
		cursor.callproc('sp_add_object_request',[hash(serial_num),dates,time_needed,classroom,banner_id,num_teams,notes])
		cursor.fetchall()

		toaddr = session['email']
		body = 'Your item request has been received.\nYou will receive a notification when your request is approved or denied.\n\n'
		inventory_item_info = "TITLE: " + item_name + "\n"
		inventory_item_info += "DATE(S) NEEDED: " + dates + "\n"
		inventory_item_info += "CLASSROOM: " + classroom + "\n"
		inventory_item_info += "NUMBER OF TEAMS: " + num_teams + "\n"
		inventory_item_info += "ADDITIONAL NOTES: " + notes + "\n"
		body += inventory_item_info

		#get some sort of unique email Subject
		email_id = toaddr + dates + item_name
		email_id = str(abs(hash(email_id)))

		subject = 'Physics request #' + email_id
		sendEmail(toaddr,body,subject)

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/acceptInventoryRequest",methods=['GET'])
def acceptInventoryRequest():
	conn = get_db()
	result = MISSING_INPUT
	request_id = request.args.get('request_id')
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		cursor.callproc('sp_get_object_request_by_id',[request_id])
		request_data = cursor.fetchall()[0]
		dates = request_data[2]
		time_needed = request_data[3]
		classroom = request_data[4]
		banner_id = request_data[5]
		num_teams = request_data[6]
		item_name = request_data[10]
		cursor.callproc('sp_delete_object_item_request',[request_id])
		cursor.fetchall()
		result = SUCCESS

		cursor.callproc('sp_get_email',[int(banner_id)])

		toaddr = cursor.fetchall()[0][0]

		body = 'Your request for the following item has been approved:\n\n'
		inventory_item_info = "TITLE: " + item_name + "\n"
		inventory_item_info += "DATE(S) NEEDED: " + dates + "\n"
		inventory_item_info += "CLASSROOM: " + classroom + "\n"
		inventory_item_info += "NUMBER OF TEAMS: " + str(num_teams) + "\n"
		body += inventory_item_info

		#get some sort of unique email Subject
		email_id = toaddr + dates + item_name
		email_id = str(abs(hash(email_id)))

		subject = 'Physics request accepted #' + email_id
		sendEmail(toaddr,body,subject)

		result = SUCCESS

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/rejectInventoryRequest",methods=['GET'])
def rejectInventoryRequest():
	conn = get_db()
	result = MISSING_INPUT
	request_id = request.args.get('request_id')
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		cursor.callproc('sp_get_object_request_by_id',[request_id])
		request_data = cursor.fetchall()[0]
		dates = request_data[2]
		time_needed = request_data[3]
		classroom = request_data[4]
		banner_id = request_data[5]
		num_teams = request_data[6]
		item_name = request_data[10]
		cursor.callproc('sp_delete_object_request',[request_id])
		cursor.fetchall()
		result = SUCCESS

		cursor.callproc('sp_get_email',[int(banner_id)])

		toaddr = cursor.fetchall()[0][0]
		body = 'Your request for the following item has been rejected:\n\n'
		inventory_item_info = "TITLE: " + item_name + "\n"
		inventory_item_info += "DATE(S) NEEDED: " + dates + "\n"
		inventory_item_info += "CLASSROOM: " + classroom + "\n"
		inventory_item_info += "NUMBER OF TEAMS: " + str(num_teams) + "\n"
		body += inventory_item_info
		#get some sort of unique email Subject
		email_id = toaddr + dates + item_name
		email_id = str(abs(hash(email_id)))
		subject = 'Physics request rejected #' + email_id
		sendEmail(toaddr,body,subject)

		result = SUCCESS

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/getAllInventoryRequests",methods=['GET'])
def getAllInventoryRequests():
	conn = get_db()
	result = MISSING_INPUT
	cursor = conn.cursor()

	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX]
	if can_remove_record == 1:
		cursor.callproc('sp_get_all_object_requests',[])
		result = cursor.fetchall()

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/importInventory",methods=['GET'])
def importInventory():
 	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])
	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_ADD_RECORD_INDEX]

	if permission == 1:
		importedData = spreadsheet.importInventorySheet()
	 	numData = len(importedData)

		for entry in range(0, numData):
			importedEntry = importedData[entry]
			
			cursor.callproc('sp_add_inventory_item',[importedEntry[0],importedEntry[1],int(importedEntry[2]),int(importedEntry[3]),importedEntry[4], float(importedEntry[5]),importedEntry[6],importedEntry[7],importedEntry[8],int(importedEntry[9])])
	
		cursor.close()
 		return redirect(url_for('mainInventoryView'))
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/importLabs",methods=['GET'])
def importLabs():
        conn = get_db()
        cursor = conn.cursor()
        result = INCORRECT_PERMISSIONS
        banner_id = session['banner_id']
        cursor.callproc('sp_get_permissions',[banner_id])
        user_permissions = cursor.fetchall()[0]
        permission = user_permissions[CAN_ADD_RECORD_INDEX]

        if permission == 1:
                importedData = spreadsheet.importLabSheet()
                numData = len(importedData)

                for entry in range(0, numData):
                        importedEntry = importedData[entry]
			cursor.callproc('sp_add_lab', [importedEntry[0],importedEntry[1],importedEntry[2],importedEntry[3],importedEntry[4],None])
			lab_id = cursor.fetchall()[0][0]
			spreadsheet.getPDFs(importedEntry[5],lab_id)
        	cursor.close()
        	return redirect(url_for('labsAndDemos'))
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route("/importDemos",methods=['GET'])
def importDemos():
        conn = get_db()
        cursor = conn.cursor()
        result = INCORRECT_PERMISSIONS
        banner_id = session['banner_id']
        cursor.callproc('sp_get_permissions',[banner_id])
        user_permissions = cursor.fetchall()[0]
        permission = user_permissions[CAN_ADD_RECORD_INDEX]

        if permission == 1:
                importedData = spreadsheet.importDemoSheet()
                numData = len(importedData)

                for entry in range(0, numData):
                        importedEntry = importedData[entry]
                        cursor.callproc('sp_add_lab', [importedEntry[0],importedEntry[1],importedEntry[2],importedEntry[3],importedEntry[4],None])
                        lab_id = cursor.fetchall()[0][0]
                        #spreadsheet.getPDFs(importedEntry[5],lab_id)
        	cursor.close()
        	return redirect(url_for('labsAndDemos'))
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/addLocation')
def addLocation():
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])
	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_ADD_RECORD_INDEX]

	if permission == 1:
		building = request.args.get('building')
		room_num = request.args.get('room_num')
		input_type = request.args.get('type')
		cursor.callproc('sp_add_location',[building,room_num,input_type])
		result = cursor.fetchall()
		cursor.close()
		return jsonify(result = result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/removeLocation')
def removeLocation():
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])
	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_REMOVE_RECORD_INDEX]

	if permission == 1:
		location_id = request.args.get('location_id')
		cursor.callproc('sp_delete_location',[location_id])
		result = cursor.fetchall()
		cursor.close()
		return jsonify(result = result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/getLocations')
def getLocations():
	conn = get_db()
	cursor = conn.cursor()
	input_type = request.args.get('type')
	cursor.callproc('sp_get_all_locations_by_type',[input_type])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result = result)

@flask_application.route('/getAllCourses')
def getAllCourses():
	conn = get_db()
	cursor = conn.cursor()
	cursor.callproc('sp_get_all_courses',[])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result = result)

@flask_application.route('/addCourse')
def addCourse():
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])
	user_permissions = cursor.fetchall()[0]
	permission = user_permissions[CAN_ADD_RECORD_INDEX]

	if permission == 1:
		name = request.args.get('name')
		cursor.callproc('sp_add_course',[name])
		result = cursor.fetchall()
		cursor.close()
		return jsonify(result = result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/removeCourse')
def removeCourse():
    conn = get_db()
    cursor = conn.cursor()
    result = INCORRECT_PERMISSIONS
    banner_id = session['banner_id']
    cursor.callproc('sp_get_permissions',[banner_id])
    user_permissions = cursor.fetchall()[0]
    permission = user_permissions[CAN_REMOVE_RECORD_INDEX]

    if permission == 1:
	course_id = request.args.get('course_id')
	cursor.callproc('sp_delete_course',[course_id])
	result = cursor.fetchall()
    	cursor.close()
    	return jsonify(result = result)
    else:
	cursor.close()	
        return redirect(url_for('insufficientPermissions'))

@flask_application.route('/getAllConstants')
def getAllConstants():
	conn = get_db()
	cursor = conn.cursor()
	cursor.callproc('sp_get_all_constants',[])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result = result)

@flask_application.route('/populateTestData')
def testData():
	cursor = get_db().cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_ADD_RECORD_INDEX];

	if int(can_modify_record) == 1:
		conn = get_db()
		cursor = conn.cursor()
		for i in range(1,25):
			cursor.callproc('sp_add_inventory_item',['TEST OBJECT ' + str(i),str(i),hash(str(i)),i,'09/24/1995',50.0+i,'Verilog',(i%4)+1,'A' + str((i%4)+1),i])
		result = 'FINISHED'
	cursor.close()
	return jsonify(result=result)

@flask_application.route('/updateSpreadsheetURL')
def updateSpreadsheetURL():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		new_url = request.args.get('new_url')
		sheet_type = request.args.get('sheet_type')
		cursor.callproc('sp_update_spreadsheet_url',[sheet_type,new_url])
		result = cursor.fetchall()
		try:
			if result[0][0]:
				cursor.callproc('sp_add_spreadsheet',[sheet_type,new_url])
		except:
			result = SUCCESS
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/getSpreadsheetURL')
def getSpreadsheetURL():
	conn = get_db()
	cursor = conn.cursor()
	sheet_type = request.args.get('sheet_type')
	cursor.callproc('sp_get_all_spreadsheets',[sheet_type])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

#https://stackoverflow.com/questions/14191832/how-to-calculate-difference-between-two-dates-in-weeks-in-python
def getWeeksBetweenDates(d1,d2):
	monday1 = (d1 - timedelta(days=d1.weekday()))
	monday2 = (d2 - timedelta(days=d2.weekday()))
	return ((monday1-monday2).days / 7)

@flask_application.route('/remainingWeeks',methods=['GET'])
def remainingWeeks():
	current_date = datetime.strptime(datetime.now().strftime('%m/%d/%Y'),'%m/%d/%Y')
	compare_date = current_date

	conn = get_db()
	cursor = conn.cursor()
	cursor.callproc('sp_get_all_constants',[])

	constants = cursor.fetchall()[0]
	end_date_str = constants[4]
	start_date_str = constants[3]

	end_date = datetime.strptime(end_date_str,'%m/%d/%Y')
	start_date = datetime.strptime(start_date_str,'%m/%d/%Y')

	if start_date > current_date:
		compare_date = start_date

	remaining_weeks = getWeeksBetweenDates(end_date,compare_date)
	total_weeks = getWeeksBetweenDates(end_date,start_date)
	cursor.close()
	return jsonify({'remaining':remaining_weeks,'total':total_weeks})

@flask_application.route('/addTopic')
def addTopic():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX];

	if int(can_add_record) == 1:
		topic_name = request.args.get('name')
		cursor.callproc('sp_add_topic',[topic_name])
		cursor.fetchall()
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/removeTopic')
def removeTopic():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX];

	if int(can_remove_record) == 1:
		topic_id = request.args.get('topic_id')
		cursor.callproc('sp_delete_topic',[topic_id])
		cursor.fetchall()
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/getConcepts')
def getConcepts():
	conn = get_db()
	cursor = conn.cursor()
	cursor.callproc('sp_get_all_concepts',[])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route('/getTopics')
def getTopics():
	conn = get_db()
	cursor = conn.cursor()
	cursor.callproc('sp_get_all_topics',[])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route('/getSubconcepts')
def getSubconcepts():
	conn = get_db()
	cursor = conn.cursor()
	parent_concept_id = request.args.get('concept_id')
	if parent_concept_id == "":
		parent_concept_id = None
	cursor.callproc('sp_get_all_subconcepts',[parent_concept_id])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route('/addConcept')
def addConcept():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX];

	if int(can_add_record) == 1:
		concept_name = request.args.get('name')
		cursor.callproc('sp_add_concept',[concept_name])
		cursor.fetchall()
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/addSubconcept')
def addSubconcept():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX];

	if int(can_add_record) == 1:
		subconcept_name = request.args.get('name')
		parent_concept_id = request.args.get('concept_id')
		cursor.callproc('sp_add_subconcept',[subconcept_name,parent_concept_id])
		cursor.fetchall()
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/moveSubconcept')
def moveSubconcept():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_record = user_permissions[CAN_ADD_RECORD_INDEX];

	if int(can_add_record) == 1:
		subconcept_name = request.args.get('name')
		subconcept_id = request.args.get('subconcept_id')
		cursor.callproc('sp_delete_subconcept',[subconcept_id])
		cursor.callproc('sp_add_concept',[subconcept_name])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/removeSubconcept')
def removeSubconcept():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX];

	if int(can_remove_record) == 1:
		subconcept_id = request.args.get('subconcept_id')
		cursor.callproc('sp_delete_subconcept',[subconcept_id])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/removeConcept')
def removeConcept():
	conn = get_db()
	cursor = conn.cursor()
	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_remove_record = user_permissions[CAN_REMOVE_RECORD_INDEX];

	if int(can_remove_record) == 1:
		concept_id = request.args.get('concept_id')
		cursor.callproc('sp_remove_subconcepts_by_concept',[concept_id])
		cursor.callproc('sp_delete_concept',[concept_id])
		result = SUCCESS
		cursor.close()
		return jsonify(result=result)
	else:
		cursor.close()
                return redirect(url_for('insufficientPermissions'))

@flask_application.route('/getStoredUsername')
def getStoredUsername():
        return jsonify(username=session['username_to_add'])

@flask_application.route('/insufficientPermissions')
def insufficientPermissions():
	return render_template("insufficientPermissions.html");
	

if __name__ == "__main__":
	flask_application.debug = True
	flask_application.secret_key = 'rowanphysicssweng'
	flask_application.run(host=os.getenv('LISTEN', '0.0.0.0'))

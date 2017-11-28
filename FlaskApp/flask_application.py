###########################################################################################
########################################  IMPORTS  ########################################
###########################################################################################

from flask import Flask, render_template, json, request, session, redirect, url_for, jsonify, g
from flaskext.mysql import MySQL
import os
import platform

###########################################################################################
##################################### ERROR CONSTANTS #####################################
###########################################################################################

NO_BANNER_ID_ERROR = 'DB_BANNER_ERROR'
SUCCESS = 'SUCCESS'
MISSING_INPUT = 'INPUT_NOT_SUPPLIED'
NO_REQUESTS = 'NO_REQUESTS'
INCORRECT_PERMISSIONS = 'INCORRECT_PERMISSIONS'

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

flask_application.config['MYSQL_DATABASE_USER'] = 'root'

flask_application.config['MYSQL_DATABASE_PASSWORD'] = 'rowanphysicssweng'   # todo, change back to rowanphysicssweng for push, change to personal password for dev work

flask_application.config['MYSQL_DATABASE_DB'] = 'physics'
flask_application.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(flask_application)

#conn = mysql.connect()

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

###########################################################################################
############################   WEBPAGE ENDPOINTS   ########################################
###########################################################################################

@flask_application.route("/")
def main():
	return render_template("index.html")

@flask_application.route("/showPermissions",methods=['GET'])
def showPermissions():
	return render_template("showPermissions.html");

@flask_application.route("/manageLabRequest",methods=['GET'])
def manageLabRequest():
	return render_template("labsDemosRequests.html");

@flask_application.route("/uploadDatabase",methods=['GET'])
def uploadDatabase():
	conn = get_db()
	cursor = conn.cursor()


	if session.has_key('banner_id') == False:
		return render_template("index.html")

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_modify_record = user_permissions[CAN_MODIFY_RECORD_INDEX];

	if int(can_modify_record) == 1:
		return render_template("uploadDatabase.html")

@flask_application.route("/inventory",methods=['GET'])
def mainInventoryView():
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


@flask_application.route("/PermissionsForAdminPage",methods=['GET'])
def PermissionsForAdminPage():
	return render_template("PermissionsForAdminPage.html");

@flask_application.route("/labsAndDemos",methods=['GET'])
def labsAndDemos():
	conn = get_db()
	cursor = conn.cursor()


	if session.has_key('banner_id') == False:
		return render_template("index.html")

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
	return render_template("manageUserRequests.html");

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
def login():
	result = MISSING_INPUT
	conn = get_db()
	cursor = conn.cursor()

	username = request.args.get('user')
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
		cursor.callproc('sp_add_user',[banner_id, first_name, middle_name, last_name, username, role, email])
		result = SUCCESS
		result = cursor.fetchall()

	cursor.close()
	return jsonify(result=result)

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
	conn = get_db()
	cursor = conn.cursor()
	result = INCORRECT_PERMISSIONS

	banner_id = session['banner_id']
	cursor.callproc('sp_get_permissions',[banner_id])

	user_permissions = cursor.fetchall()[0]
	can_add_user = user_permissions[CAN_ADD_USER_INDEX]

	if int(can_add_user) == 1:
		print "allowed"
		cursor.callproc('sp_get_all_user_requests',[])
		requests = cursor.fetchall()
		print requests
		result = requests

	cursor.close()
	return jsonify(result=result)

@flask_application.route("/allUserPermissions",methods=['GET'])
def allUserPermissions():
	cursor = conn.cursor()
	result = NO_PERMISSIONS

	cursor.callproc('sp_get_all_permissions')
	all_permissions = cursor.fetchall()

	result = jsonify(result=all_permissions)
	cursor.close()
	return result

@flask_application.route("/removeInventoryItem",methods=['GET'])
def removeInventoryItem():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS
	cursor.callproc('sp_remove_inventory_item',[request.args.get('serial_num')])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

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
	cursor.callproc('sp_get_item_by_serial',[int(request.args.get('serial_num'))])
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
	cursor.callproc('sp_get_associated_labs',[int(request.args.get('serial_num'))])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)

@flask_application.route("/addInventoryItem",methods=['GET'])
def addInventoryItem():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS

	serial_num = request.args.get('serial_num')
	invoice_id = request.args.get('invoice_id')
	purchase_date = request.args.get('purchase_date')
	price = request.args.get('price')
	vendor_name = request.args.get('vendor_name')
	building = request.args.get('building')
	room_num = request.args.get('room_num')
	shelf = request.args.get('shelf')
	quantity = request.args.get('quantity')

	cursor.callproc('sp_add_inventory_item',[serial_num,invoice_id,purchase_date,price,vendor_name,building,room_num,shelf,quantity])
	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)


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
	building = request.args.get('building')
	if building == "":
		building = None
	room_num = request.args.get('room_num')
	if room_num == "":
		room_num = None
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
	cursor.callproc('sp_get_filtered_inventory_items',[name,None,vendor_name,building,room_num,shelf,order_by,asc_or_desc])

	result = cursor.fetchall()
	cursor.close()
	return jsonify(result=result)
#type:filter_type,name:filter_name,topic:filter_topic,concept:filter_concept,subconcept:filter_subconcept
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

@flask_application.route("/addLab",methods=['GET'])
def addLab():
	conn = get_db()
	cursor = conn.cursor()
	result = SUCCESS

	input_type = request.args.get('type')
	name = request.args.get('name')
	topic = request.args.get('topic')
	concept = request.args.get('concept')
	subconcept = request.args.get('subconcept')
	lab_id = request.args.get('lab_id')

	cursor.callproc('sp_add_lab',[input_type,name,topic,concept,subconcept,lab_id])
	cursor.fetchall()
	return jsonify(result=result)

if __name__ == "__main__":
	flask_application.debug = True
	flask_application.secret_key = 'rowanphysicssweng'
	flask_application.run(host=os.getenv('LISTEN', '0.0.0.0'))

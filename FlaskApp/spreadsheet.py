import gspread, threading, time
from oauth2client.service_account import ServiceAccountCredentials
import os
import socket
os.environ['http_proxy']=''
import urllib

scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('/var/www/html/physics/lab/client_secret.json', scope)
client = gspread.authorize(creds)
importSheet = client.open("Physics Inventory Import Sheet")
exportSheet = client.open("Physics Inventory Testing")

def gspreadUpdater():
	global scope,client,importSheet
	# use creds to create a client to interact with the Google Drive API
	scope = ['https://spreadsheets.google.com/feeds']
	creds = ServiceAccountCredentials.from_json_keyfile_name('/var/www/html/physics/lab/client_secret.json', scope)
	client = gspread.authorize(creds)
	importSheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1I4d5vY20A4lX3UGbamvTNCTdueZVRSBzf2gGb5XVV5A")
	exportSheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1QEMbfTEIuOuY1J-LW-EqhfuY5T4a3m9KG0WhRZDkDs0")
	time.sleep(3590)

gsUpdateThread = threading.Thread(target=gspreadUpdater)
gsUpdateThread.daemon = True
gsUpdateThread.start()

def exportInventory(*args):
	global exportSheet
	master_sheet = exportSheet.sheet1
	numRequests = len(master_sheet.get_all_values())
	if master_sheet.get_all_values() == []:
		master_sheet.resize(10, len(*args)+2)
		numRequests=1
	else:
		master_sheet.resize(numRequests+10,len(*args)+2)
	header_list = master_sheet.range('A1:H1')
	headerRow = ["Day/Week Code", "Course", "Time Requested", "Lab Classroom", "Number of Teams", "Instructor", "Notes", "Email Address"]
	if headerRow != header_list:
		for i, val in enumerate(headerRow):
                	header_list[i].value = val
        	master_sheet.update_cells(header_list)
	

	master_sheet.insert_row(*args,index=numRequests+1)	
	

def importInventorySheet():
	global importSheet
	importWksht = importSheet.get_worksheet(0)
	header_list = importWksht.range('A1:I1')
	headerRow = ["Item Name", "Serial Number", "Invoice ID", "Purchase Date", "Purchase Price", "Vendor Name", "Location ID(136 is 1, 146 is 2)", "Shelf", "Quantity"]
	for i, val in enumerate(headerRow):
		header_list[i].value = val
	importWksht.update_cells(header_list)

	#Gets entered data from sheet and stores
	bodyRange = importWksht.range('A2:I300')
	importData = importWksht.get_all_values()
	del importData[0]
	#get serial number and insert hashed serial num for each entry

	numImports = len(importData)
	for entry in range(0, numImports):
		hashed_serial = hash(importData[entry][1])
		hashed_serial = str(hashed_serial)
		importData[entry].insert(2,hashed_serial)

	#Clears the body range after importing for next time
        #for cell in ibodyRange:
        #        cell.value=""
        #importSheet.update_cells(bodyRange)

	return importData

def importLabSheet():
	global importSheet
        importLabSheet = importSheet.get_worksheet(1)
	importLabSheet.update_cell(1,1,"Lab Name")
	importLabSheet.update_cell(1,2,"Topic")
	importLabSheet.update_cell(1,3,"Concept")
	importLabSheet.update_cell(1,4,"Subconcept")
	labList = []
	cleanedData = []
	numRows = 47
	print("Num Rows: " + str(numRows))
	for i in range(2, numRows):
		importData = importLabSheet.row_values(i)
		cleanedData = []
		cleanedData.append("Lab")
		url = str(importLabSheet.cell(i,5).value)
		print "URL: " + url
		for x in range(0,4):
			cleanedData.append(importData[x])  
		cleanedData.append(url)
		#cleanedData = [x for x in importData if x]
		#cleanedData.append("")
		#cleanedData.reverse()
                #cleanedData.append("Lab")
                #cleanedData.reverse()
		#print(cleanedData)
		labList.append(cleanedData)
		#print(labList)
	
	return labList
	#print(str(labList))	

def importDemoSheet():
        global importSheet
        importDemoSheet = importSheet.get_worksheet(2)
        importDemoSheet.update_cell(1,2,"Demo Name")
        importDemoSheet.update_cell(1,2,"Demo ID")
        demoList = []

def importInventoryToLabSheet():
	global importSheet
	itlsheet = importSheet.get_worksheet(1)

def convertXtoSerial():
	global importSheet
	sheet4 = importSheet.get_worksheet(3)
	for i in range(2,155):
		list = sheet4.row_values(i)
		serial = list[0]
		print(str(serial))
		for n,i in enumerate(list):
   			if i=="x" or i=="X":
	      			list[n]=serial
		print(str(list))
		sheet4.append_row(list)

def getPDFs(address, id):
	pdf = urllib.URLopener()
	pdf.retrieve(address, "/var/www/html/physics/lab/static/lab_pdfs/" + str(id) + ".pdf")	

#importLabSheet()
#convertXtoSerial()
#getPDFs("http://users.rowan.edu/~klassen/dpa/current/IntroLabs/IdealGasLaw.pdf", 1000)
#request = ["15.2","Intro to Mechanics", "12/14/2017", "8AM", "Science 138", "8", "Dr. Klassen", None, None,"klassen@rowan.edu"]
#exportInventory(request)

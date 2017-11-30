import gspread
from oauth2client.service_account import ServiceAccountCredentials
 
# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('/var/www/FlaskApp/client_secret.json', scope)
client = gspread.authorize(creds)
 
# Find a workbook by name and open the first sheet
# Make sure you use the right name here.

def exportInventory():
	sheet = client.open("Physics Inventory Testing")
	wksheet136 = sheet.worksheet("136")
	wksheet146 = sheet.worksheet("146")
	demowksheet = sheet.worksheet("DEMO")
	cell_list = wksheet136.range('A1:J3')
	for cell in cell_list:
		cell.value = "YO!"
	wksheet136.update_cells(cell_list)

def importInventorySheet():
	importSheet = client.open("Physics Inventory Import Sheet").sheet1
	header_list = importSheet.range('A1:J1')
	headerRow = ["Serial Number", "Item Name", "Quantity", "Building", "Room Number", "Shelf", "Invoice ID", "Vendor", "Price", "Purchase Date"]
	for i, val in enumerate(headerRow):
		header_list[i].value = val
	importSheet.update_cells(header_list)
	
	#Gets entered data from sheet and stores
	bodyRange = importSheet.range('A2:J200')
	importData = importSheet.get_all_values()
	del importData[0]
	#get serial number and insert hashed serial num for each entry
	
	numImports = len(importData)
	#print(numImports)
	for entry in range(0, numImports):
		importData[entry].insert(2,"hash")
		
	#Clears the body range after importing for next time
        #for cell in bodyRange:
        #        cell.value=""
        #importSheet.update_cells(bodyRange)

	return importData


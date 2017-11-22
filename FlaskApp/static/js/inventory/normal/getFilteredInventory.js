var getFilteredInventory = function(){
  var filter_name = document.getElementById('search_input').value.toLowerCase();
  var filter_vendor = document.getElementById('vendor_input').value.toLowerCase();
  var filter_building = document.getElementById('building_input').value.toLowerCase();
  var filter_room_num = document.getElementById('room_num_input').value.toLowerCase();
  var filter_shelf = document.getElementById('shelf_input').value.toLowerCase();
  $.getJSON('/getFilteredInventory',{name:filter_name,vendor_name:filter_vendor,building:filter_building,room_num:filter_room_num,shelf:filter_shelf},
  function(data){
    var data_array = data.result;
    var table = document.getElementById('tablebody');
    table.innerHTML = "";
    for(var curr_item = 0; curr_item < data_array.length; curr_item++){
      var item = data_array[curr_item];
      var name = item[1];
      var serial_num = item[2];
      var shelf = item[7];
      var building = item[9];
      var room_num = item[10];
      var invoice_id = item[12];
      var price = item[14];
      var date = item[17];
      var vendor = item[18];
      var quantity = item[6];

      var newRow = document.createElement("tr");
      newRow.id = "row";
      var rowIndex = document.createElement("td")
      rowIndex.id = "index";
      rowIndex.innerHTML = (curr_item + 1);
      var serial_num_td = document.createElement("td");
      serial_num_td.id = "serial_num";
      serial_num_td.innerHTML = serial_num;
      var name_td = document.createElement("td");
      name_td.id = "name";
      name_td.innerHTML = name;
      var quantity_td = document.createElement("td");
      quantity_td.id = "quantity";
      quantity_td.innerHTML = quantity;
      var location_td = document.createElement("td");
      location_td.id = "location";
      location_td.innerHTML = building + " " + room_num;
      var shelf_td = document.createElement("td");
      shelf_td.id = "shelf";
      shelf_td.innerHTML = shelf;
      var vendor_td = document.createElement("td");
      vendor_td.id = "vendor";
      vendor_td.innerHTML = vendor;
      var purchase_date_td = document.createElement("td");
      purchase_date_td.id = "purchase_date";
      purchase_date_td.innerHTML = date;
      var price_td = document.createElement("td");
      price_td.id = "price";
      price_td.innerHTML = price;

      newRow.appendChild(rowIndex);
      newRow.appendChild(serial_num_td);
      newRow.appendChild(name_td);
      newRow.appendChild(quantity_td);
      newRow.appendChild(location_td);
      newRow.appendChild(shelf_td);
      newRow.appendChild(vendor_td);
      //newRow.appendChild(purchase_date_td);
      //newRow.appendChild(price_td);


      table.appendChild(newRow);


    }

  });
}

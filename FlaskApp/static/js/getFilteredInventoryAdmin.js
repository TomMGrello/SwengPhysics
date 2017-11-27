var setSerialNumToRemove = function(button){
  var tr = button.closest('tr');
  console.log(tr);
  var serial_num = tr.cells[1].innerHTML;
  console.log(serial_num);
  window.sessionStorage.setItem('serial_num_to_remove',serial_num);
};

/*var acceptRequest = function(button){
  console.log(button);
  var tr = button.closest('tr');
  var index = parseInt(tr.cells[0].innerHTML) - 1;
  var row_banner_id = tr.cells[6].innerHTML;
  var row_first_name = tr.cells[1].innerHTML;
  var row_middle_name = tr.cells[2].innerHTML;
  var row_last_name = tr.cells[3].innerHTML;
  var row_username = tr.cells[5].innerHTML;
  var row_email = tr.cells[4].innerHTML;
  var row_role = tr.cells[7].innerHTML;
  acceptUserRequest(row_banner_id,row_first_name,row_middle_name,row_last_name,row_username,row_role,row_email);
};*/

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

      var edit_td = document.createElement('td');
      var edit_p = document.createElement('p');
      edit_p.setAttribute('data-placement','top');
      edit_p.setAttribute('data-toggle','tooltip');
      edit_p.setAttribute('title','Edit');
      var edit_btn = document.createElement('button');
      edit_btn.setAttribute('class','btn btn-primary btn-xs');
      edit_btn.setAttribute('data-title','Edit');
      edit_btn.setAttribute('data-toggle','modal');
      edit_btn.setAttribute('data-target','#edit');
      var edit_span = document.createElement('span');
      edit_span.setAttribute('class', 'glyphicon glyphicon-pencil');
      edit_btn.appendChild(edit_span);
      edit_p.appendChild(edit_btn);
      edit_td.appendChild(edit_p);

      var delete_td = document.createElement('td');
      var delete_p = document.createElement('p');
      delete_p.setAttribute('data-placement','top');
      delete_p.setAttribute('data-toggle','tooltip');
      delete_p.setAttribute('title','Delete');
      var delete_btn = document.createElement('button');
      delete_btn.setAttribute('class','btn btn-danger btn-xs');
      delete_btn.setAttribute('data-title','Delete');
      delete_btn.setAttribute('data-toggle','modal');
      delete_btn.setAttribute('data-target','#delete');
      var delete_span = document.createElement('span');
      delete_span.setAttribute('class', 'glyphicon glyphicon-trash');

      delete_btn.onclick = function(){setSerialNumToRemove(this);};

      delete_btn.appendChild(delete_span);
      delete_p.appendChild(delete_btn);
      delete_td.appendChild(delete_p);

      newRow.appendChild(edit_td);
      newRow.appendChild(delete_td);


      table.appendChild(newRow);


    }

  });
}
$(function() {
  getFilteredInventory();
  document.getElementById('btn_filter').addEventListener('click',function(){
    getFilteredInventory();
  });
  document.getElementById('btn_search').addEventListener('click',function(){
    getFilteredInventory();
  });
  document.getElementById('remove_btn').addEventListener('click', function(){
    removeInventoryItem(window.sessionStorage.getItem('serial_num_to_remove'));
  });
  document.getElementById('add_item_btn').addEventListener('click', function() {
    //serial = document.getElementById('add_serial').value;
    //document.getElementById('itemname').value;
    //document.getElementById('quantity').value;
    //addInventoryItem(document.getElementById('add_serial').value, document.getElementById('add_invoice_id').value, document.getElementById('add_purchase_date').value, document.getElementById('add_price').value, document.getElementById('add_vendor').value, document.getElementById('add_building').value, document.getElementById('add_room_number').value, document.getElementById('add_shelf').value, null);
    addInventoryItem(document.getElementById('add_name').value, document.getElementById('update_serial').value, null, null, null, null, null, null, null, null);
  });
  document.getElementById('update_btn').addEventListener('click', function() {
    modifyInventoryItem(document.getElementById('update_name').value, document.getElementById('update_serial').value, null, null, null, null, null, null, null, null);// document.getElementById('update_quantity').value);
  });
  return false;
});

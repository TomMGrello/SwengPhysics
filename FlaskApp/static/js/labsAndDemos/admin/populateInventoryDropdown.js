var populateInventoryDropdown = function(){
  $.getJSON('/getFilteredInventory',{},
  function(data){
    var data_array = data.result;
    var select_serial = document.getElementById('addAllItems');
    select_serial.innerHTML = "";
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

      var new_opt = document.createElement('option');
      new_opt.text = name;
      new_opt.value = serial_num;
      select_serial.appendChild(new_opt);
    }
  });
}

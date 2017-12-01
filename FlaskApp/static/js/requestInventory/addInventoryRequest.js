var addInventoryRequest = function() {
  var serial_num = window.sessionStorage.getItem('serial_num');
  var dates = document.getElementById('date').value;
  var time_needed = document.getElementById('startTime').value;
  var num_items = document.getElementById('numItems').value;
  var notes = document.getElementById('notes').value;
  var room = document.getElementById('room').value;
  var item_name = document.getElementById('item_name').value;
  $.getJSON("/addInventoryRequest",{
    serial_num:serial_num,
    dates:dates,
    time:time_needed,
    num_items:num_items,
    notes:notes,
    classroom:room,
    item_name:item_name
  }, function(data){
    location.href = "/inventory";
    return false;
  })

}

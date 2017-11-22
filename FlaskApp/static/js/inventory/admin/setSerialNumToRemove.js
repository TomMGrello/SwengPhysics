var setSerialNumToRemove = function(button){
  var tr = button.closest('tr');
  console.log(tr);
  var serial_num = tr.cells[1].innerHTML;
  console.log(serial_num);
  window.sessionStorage.setItem('serial_num_to_remove',serial_num);
};

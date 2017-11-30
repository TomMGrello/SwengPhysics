var rejectInventoryRequest = function(button){
  var tr = button.closest('tr');
  var request_id = tr.id;
  $.getJSON("/rejectInventoryRequest",{
    request_id:request_id
  }, function(data){
    location.reload();
    return false;
  });
}

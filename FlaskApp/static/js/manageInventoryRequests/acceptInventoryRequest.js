var acceptInventoryRequest = function(button){
  var tr = button.closest('tr');
  var request_id = tr.id;
  $.getJSON("/acceptInventoryRequest",{
    request_id:request_id
  }, function(data){
    location.reload();
    return false;
  });
}

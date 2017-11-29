var acceptLabRequest = function(button){
  var tr = button.closest('tr');
  var request_id = tr.id;
  $.getJSON("/acceptLabRequest",{
    request_id:request_id
  }, function(data){
    location.reload();
    return false;
  });
}

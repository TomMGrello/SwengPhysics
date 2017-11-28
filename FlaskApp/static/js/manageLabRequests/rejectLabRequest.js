var rejectLabRequest = function(button){
  var tr = button.closest('tr');
  var request_id = tr.id;
  $.getJSON("/rejectLabRequest",{
    request_id:request_id
  }, function(data){
    return false;
  });
}

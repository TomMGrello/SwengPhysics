var updateAutoAccept = function() {
  var btn_auto_accept = document.getElementById('btn_auto_accept');
  var new_value = btn_auto_accept.value;
  console.log("NEW VALUE: " + new_value);
    $.getJSON('/updateConstants', {auto_accept:new_value}, function(data) {
      location.reload();
    });
    return false;
}

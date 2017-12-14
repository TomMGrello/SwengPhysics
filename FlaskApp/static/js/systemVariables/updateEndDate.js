var updateEndDate = function() {
  var new_end_date = document.getElementById('end_date').value;
  console.log("NEW VALUE: " + new_end_date);
    $.getJSON($SCRIPT_ROOT + '/updateConstants', {semester_end_date:new_end_date}, function(data) {
      location.reload();
    });
    return false;
}

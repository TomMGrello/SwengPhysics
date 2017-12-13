var updateStartDate = function() {
  var new_start_date = document.getElementById('start_date').value;
  console.log("NEW VALUE: " + new_start_date);
    $.getJSON('/updateConstants', {semester_start_date:new_start_date}, function(data) {
      location.reload();
    });
    return false;
}

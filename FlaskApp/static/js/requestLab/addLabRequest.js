var addLabRequest = function() {
  var lab_id = window.sessionStorage.getItem('lab_id');
  var dates = document.getElementById('date').value;
  var time_needed = document.getElementById('startTime').value;
  var num_teams = document.getElementById('numTeams').value;
  var notes = document.getElementById('notes').value;
  var room = document.getElementById('room').value;
  var lab_name = document.getElementById('lab').value;
  $.getJSON("/addLabRequest",{
    lab_id:lab_id,
    dates:dates,
    time:time_needed,
    num_teams:num_teams,
    notes:notes,
    classroom:room,
    lab_name:lab_name
  }, function(data){
    location.href = "/labsAndDemos";
    return false;
  })

}

var addLabRequest = function() {
  var lab_id = window.sessionStorage.getItem('lab_id');
  var week_select = document.getElementById('week');
  var week = week_select[week_select.selectedIndex].value;
  var time_needed = document.getElementById('startTime').value;
  var num_teams = document.getElementById('numTeams').value;
  var notes = document.getElementById('notes').value;
  var room = document.getElementById('room');
  var location_id = room.options[room.selectedIndex].value;
  var classroom = room.options[room.selectedIndex].text;
  var lab_name = document.getElementById('lab').value;
  var days_of_week = document.getElementsByName('days_of_week');
  var dates_string = "";
  for(var i = 0; i < days_of_week.length; i++){
      var day = days_of_week[i];
      if(day.checked){
        if(dates_string === "")
          dates_string += week + "." + day.value;
        else
          dates_string += "," + week + "." + day.value
      }
  }
  console.log("DATES: " + dates_string);
  if(dates_string === ""){
    alert("Please choose at least one day of the week");
    return false;
  }

  $.getJSON("/addLabRequest",{
    lab_id:lab_id,
    dates:dates_string,
    time:time_needed,
    num_teams:num_teams,
    notes:notes,
    location_id:location_id,
    classroom:classroom,
    lab_name:lab_name
  }, function(data){
    location.href = "/labsAndDemos";
    return false;
  })

}

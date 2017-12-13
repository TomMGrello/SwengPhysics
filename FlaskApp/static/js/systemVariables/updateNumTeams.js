var updateNumTeams = function() {
  var new_num_teams = document.getElementById('num_teams').value;
  console.log("NEW VALUE: " + new_num_teams);
    $.getJSON('/updateConstants', {required_num_teams:new_num_teams}, function(data) {
      location.reload();
    });
    return false;
}

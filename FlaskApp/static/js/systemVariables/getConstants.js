var getAllConstants = function() {
    $.getJSON('/getAllConstants', {}, function(data) {

      var auto_accept = data.result[0][1];
      var num_teams = data.result[0][2];
      var start_date = data.result[0][3];
      var end_date = data.result[0][4];
      document.getElementById('start_date').value = start_date;
      document.getElementById('end_date').value = end_date;
      document.getElementById('num_teams').value = num_teams;
      var auto_accept_btn = document.getElementById('btn_auto_accept');
      if(auto_accept == 1){
        btn_auto_accept.value = 0;
        btn_auto_accept.innerHTML = "Currently: ON"
      } else {
        btn_auto_accept.value = 1;
        btn_auto_accept.innerHTML = "Currently: OFF"
      }
    });
    return false;

}

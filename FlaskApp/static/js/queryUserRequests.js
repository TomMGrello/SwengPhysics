$(function() {
  $.getJSON('/userRequests',{},
  function(data){
    data_array = data.result;
    for(var curr_user = 0; curr_user < data_array.length; curr_user++){
      //For each user...
      var curr_user_data = data_array[curr_user];
      var first_name = curr_user_data[1];
      var last_name = curr_user_data[2];
      var banner_id = curr_user_data[3];
      var role  = curr_user_data[4];
      
    }

  });
  return false;
});

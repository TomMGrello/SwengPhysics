var getAllRequests = function() {
  $.getJSON("/getAllLabRequests",{},function(data){
    var data_result = data.result;

    for(var curr_request = 0; curr_request < data_result.length; curr_request++){
      //Do stuff
    }

    return false;
  });
}

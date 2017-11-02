$(document).ready(function() {
  $.getJSON('/deleteUserRequest',{
    banner_id:"123123123",
    role:"student"
  },
  function(data){
    alert(data.result);
  });
});

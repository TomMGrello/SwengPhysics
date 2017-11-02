$(document).ready(function() {
  $.getJSON('/addUserRequest',{
    first_name:"HELLO",
    last_name:"WORLD",
    banner_id:"123123123",
    role:"student"
  },
  function(data){

  });
});

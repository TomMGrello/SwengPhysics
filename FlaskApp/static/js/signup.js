$(function() {
  $('#signup').click(function() {
    var first_name;
    var middle_name;
    var last_name;
    var username;
    var role;
    var banner_id;
    var email;
    $.getJSON('/login',{},
      function(data){
        window.location='/adminPage';
      });
    return false;
  });
});

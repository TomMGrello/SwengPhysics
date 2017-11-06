$(function() {
  $('#signup').click(function() {
<<<<<<< HEAD
    var first_name = document.getElementById("inputFirstName").value;
    var middle_name = document.getElementById("inputMiddleName").value;
    var last_name = document.getElementById("inputLastName").value;
    var username = document.getElementById("inputUsername").value;
    var roleSelect = document.getElementById("inputRole")
    var role = roleSelect.options[roleSelect.selectedIndex].value;
    var banner_id = document.getElementById("inputBannerId").value;
    var email = document.getElementById("inputEmail").value;
    var myjson = {
      first_name:first_name,
      middle_name:middle_name,
      last_name:last_name,
      username:username,
      banner_id:banner_id,
      role:role,
      email:email
    };
    console.log(myjson);
    $.getJSON('/addUserRequest',{
      first_name:first_name,
      middle_name:middle_name,
      last_name:last_name,
      username:username,
      banner_id:banner_id,
      role:role,
      email:email
    },
      function(data){
        window.location='/';
=======
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
>>>>>>> origin/hamlinj9
      });
    return false;
  });
});

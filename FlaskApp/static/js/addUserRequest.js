function addUserRequest(first_name,middle_name,last_name,banner_id,username,role,email){
  $.getJSON('/addUserRequest',{
    first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    banner_id:banner_id,
    email:email,
    role:role
  },
  function(data){
    alert("ADDED REQUEST");
  });
}

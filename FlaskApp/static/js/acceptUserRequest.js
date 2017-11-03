function acceptUserRequest(banner_id, first_name, middle_name, last_name, username, role, email){
  $.getJSON('/acceptUserRequest',{
    banner_id:banner_id,
    first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    user:username,
    role:role,
    email:email
  },
  function(data){
    alert("ACCEPTED");
  });
}

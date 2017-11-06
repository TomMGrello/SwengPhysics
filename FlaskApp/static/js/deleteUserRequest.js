function deleteUserRequest(banner_id,role) {
  $.getJSON('/deleteUserRequest',{
    banner_id:banner_id,
    role:role
  },
  function(data){
<<<<<<< HEAD
    location.reload();
=======
    alert("DELETED");
>>>>>>> origin/hamlinj9
  });
}

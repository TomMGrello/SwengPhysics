  $(function() {
    $('#signin').click(function() {
<<<<<<< HEAD
      if(!($('#usernameInput').val())) {
        window.reload();
      }
=======
>>>>>>> origin/hamlinj9
  		$.getJSON('/login',{user:$('#usernameInput').val()},
    		function(data){
          if(data.result === "DB_BANNER_ERROR"){
            window.location = "/requestAccess";
          }
          else {
<<<<<<< HEAD
            window.location = "/inventory";
=======
            window.location = "/adminPage"
>>>>>>> origin/hamlinj9
          }
    		});
  		return false;
    });
});

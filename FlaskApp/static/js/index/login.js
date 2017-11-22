  $(function() {
    $('#signin').click(function() {
      if(!($('#usernameInput').val())) {
        window.reload();
      }
  		$.getJSON('/login',{user:$('#usernameInput').val()},
    		function(data){
          if(data.result === "DB_BANNER_ERROR"){
            window.location = "/requestAccess";
          }
          else {
            window.location = "/inventory";
          }
    		});
  		return false;
    });
});

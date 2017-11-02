  $(function() {
    $('#signin').click(function() {
  		$.getJSON('/login',{user:$('#usernameInput').val()},
    		function(data){
    			window.location='/adminPage';
    		});
  		return false;
    });
});

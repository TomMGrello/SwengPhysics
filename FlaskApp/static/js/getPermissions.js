  $(function() {
    $('#signin').click(function() {
		$.getJSON('/login',{user:$('#usernameInput').val()},
		function(data){
			//alert(data.result);
			window.location='/adminPage';
		});
		return false;
    });
});

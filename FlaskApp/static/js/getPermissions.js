  $(function() {
    $('#signin').click(function() {
		$.getJSON('/storeUsername',{user:$('#usernameInput').val()},
		function(data){
			//alert(data.result);
			window.location='/adminPage';
		});
		return false;
    });
});

  $(function() {
	var username = $('#usernameInput').val();
    $('#signin').click(function() {
		$.getJSON('/storeUsername',{user:$('#usernameInput').val()},
		function(data){
			alert(data.result);
			window.location='/showPermissions';
		});
		return false;
    });
});

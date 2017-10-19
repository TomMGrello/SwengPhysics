  $(function() {
	$.getJSON('/permissions',{},
	function(data){
		alert(data.result);
		//window.location='/showPermissions';
	});
	return false;
});

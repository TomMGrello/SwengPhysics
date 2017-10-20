  $(function() {
	$.getJSON('/permissions',{},
	function(data){
    var split_string = data.result.toString().split(",");
    document.getElementById('usernameLabel').innerHTML = split_string[1];
    document.getElementById('addUserLabel').innerHTML = split_string[2];
    document.getElementById('removeUserLabel').innerHTML = split_string[3];
    document.getElementById('modifyPermissionsLabel').innerHTML = split_string[4];
    document.getElementById('requestRecordLabel').innerHTML = split_string[5];
    document.getElementById('addRecordLabel').innerHTML = split_string[6];
    document.getElementById('removeRecordLabel').innerHTML = split_string[7];
    document.getElementById('modifyRecordLabel').innerHTML = split_string[8];
    document.getElementById('backupDatabaseLabel').innerHTML = split_string[9];
    document.getElementById('restoreDatabaseLabel').innerHTML = split_string[10];
		//window.location='/showPermissions';
	});
	return false;
});

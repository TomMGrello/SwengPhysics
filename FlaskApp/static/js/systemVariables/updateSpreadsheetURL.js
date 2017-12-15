var updateSpreadsheetURL = function(new_url,type) {
    $.getJSON($SCRIPT_ROOT + '/updateSpreadsheetURL', {new_url:new_url,sheet_type:type}, function(data) {
      location.reload();
    });
    return false;
}

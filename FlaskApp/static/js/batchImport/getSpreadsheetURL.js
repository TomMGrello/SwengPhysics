var getSpreadsheetURL = function(type) {
    $.getJSON($SCRIPT_ROOT + '/getSpreadsheetURL', {sheet_type:'import_inventory'}, function(data) {
      document.getElementById('btn_inventory').href = data.result[0][2];
      document.getElementById('btn_labs').href = data.result[0][2];
    });

    return false;
}

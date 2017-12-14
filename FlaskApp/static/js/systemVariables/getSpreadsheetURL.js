var getSpreadsheetURL = function(type) {
    $.getJSON('/getSpreadsheetURL', {sheet_type,type}, function(data) {
      return data.result[0][2];
    });
    return false;
}

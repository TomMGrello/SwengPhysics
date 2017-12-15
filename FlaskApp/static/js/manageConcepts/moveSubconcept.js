var moveSubconcept = function() {
  var remove_subconcept_select = document.getElementById('remove_subconcept_select');
  var subconcept_id = remove_subconcept_select.options[remove_subconcept_select.selectedIndex].value;
  var subconcept_name = remove_subconcept_select.options[remove_subconcept_select.selectedIndex].text;
    $.getJSON($SCRIPT_ROOT + '/moveSubconcept', {subconcept_id:subconcept_id,name:subconcept_name}, function(data) {
      location.reload();
    });
    return false;
}

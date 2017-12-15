var removeSubconcept = function() {
  var remove_subconcept_select = document.getElementById('remove_subconcept_select');
  var subconcept_id = remove_subconcept_select.options[remove_subconcept_select.selectedIndex].value;
    $.getJSON($SCRIPT_ROOT + '/removeSubconcept', {subconcept_id:subconcept_id}, function(data) {
      location.reload();
    });
    return false;
}

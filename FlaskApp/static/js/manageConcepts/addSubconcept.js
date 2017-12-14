var addSubconcept = function() {
  var add_subconcept_select = document.getElementById('add_subconcept_select');
  var concept_id = add_subconcept_select.options[add_subconcept_select.selectedIndex].value;
  var add_subconcept_input = document.getElementById('add_subconcept_input');
  var subconcept_name = add_subconcept_input.value;
    $.getJSON('/addSubconcept', {concept_id:concept_id,name:subconcept_name}, function(data) {
      location.reload();
    });
    return false;
}

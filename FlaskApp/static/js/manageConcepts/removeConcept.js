var removeConcept = function() {
  var remove_concept_select = document.getElementById('remove_concept_select');
  var concept_id = remove_concept_select.options[remove_concept_select.selectedIndex].value;
    $.getJSON('/removeConcept', {concept_id:concept_id}, function(data) {
      location.reload();
    });
    return false;
}

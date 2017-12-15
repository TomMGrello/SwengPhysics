var addConcept = function() {
  var concept_name = document.getElementById('add_concept_input').value;
    $.getJSON($SCRIPT_ROOT + '/addConcept', {name:concept_name}, function(data) {
      location.reload();
    });
    return false;
}

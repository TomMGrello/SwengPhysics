var getSubconcepts = function() {
  var remove_subconcept_select = document.getElementById('remove_subconcept_select');

    $.getJSON('/getSubconcepts', {concept_id:null}, function(data) {
      var subconcepts = data.result;
      for(var i = 0; i < subconcepts.length; i++){
        var curr_subconcept = subconcepts[i];
        var subconcept_id = curr_subconcept[0];
        var subconcept_name = curr_subconcept[1];
        var option = document.createElement('option');
        option.value = subconcept_id;
        option.text = subconcept_name;
        remove_subconcept_select.appendChild(option);
      }
    });
    return false;
}

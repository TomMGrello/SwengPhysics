var getConcepts = function() {
  var remove_concept_select = document.getElementById('remove_concept_select');
  var add_subconcept_select = document.getElementById('add_subconcept_select');
    $.getJSON($SCRIPT_ROOT + '/getConcepts', {}, function(data) {
      var concepts = data.result;
      for(var i = 0; i < concepts.length; i++){
        var curr_concept = concepts[i];
        var concept_id = curr_concept[0];
        var concept_name = curr_concept[1];
        var option = document.createElement('option');
        option.value = concept_id;
        option.text = concept_name;
        remove_concept_select.appendChild(option);
        var option2 = document.createElement('option');
        option2.value = concept_id;
        option2.text = concept_name;
        add_subconcept_select.appendChild(option2);
      }
    });
    return false;
}

function populateAddDropdowns() {
    populateaddTopics();
    populateaddConcepts();
    populateaddSubconcepts();


}

function populateaddConcepts(){
  $.getJSON($SCRIPT_ROOT + '/getConcepts', {},function(data) {
          var add_concept = document.getElementById('concept');
          add_concept.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var concept = data_array[i][1];
            var concept_id = data_array[i][0];
            var option = document.createElement('option');
            option.value = concept;
            option.text = concept;
            add_concept.appendChild(option);
          }
      });
}

function populateaddSubconcepts(){
  var add_subconcept = document.getElementById('subconcept');
  var add_concept = document.getElementById('concept');
  var concept_id;
  if(add_concept.options[add_concept.selectedIndex])
    concept_id = add_concept.options[add_concept.selectedIndex].value;
  add_subconcept.innerHTML = "";
  $.getJSON($SCRIPT_ROOT + '/getSubconcepts', {concept_id:null},function(data) {
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var subconcept = data_array[i][1];
            var option = document.createElement('option');
            option.value = subconcept;
            option.text = subconcept;
            add_subconcept.appendChild(option);
          }
      });
}

function populateaddTopics(){
  $.getJSON($SCRIPT_ROOT + '/getTopics', {},function(data) {
          var add_topic = document.getElementById('topic');
          add_topic.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var topic = data_array[i][1];
            var option = document.createElement('option');
            option.value = topic;
            option.text = topic;
            add_topic.appendChild(option);
          }
      });
}

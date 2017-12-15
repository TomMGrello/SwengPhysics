function populateFilterDropdowns() {
    populateTopics();
    populateConcepts();
    populateSubconcepts();
    $(document).on('change',"#filter_concept", function() {
      populateSubconcepts();
    });
}

function populateConcepts(){
  $.getJSON($SCRIPT_ROOT + '/getConcepts', {},function(data) {
          var filter_concept = document.getElementById('filter_concept');
          filter_concept.innerHTML = "";
          var data_array = data.result;
	  var index = 0;
          for(var i = 0; i < data_array.length; i++){
            var concept = data_array[i][1];
            var subconcept = data_array[i][0];
            var option = document.createElement('option');
            option.value = subconcept;
            option.text = concept;
            filter_concept.appendChild(option);
	    index = i;
          }
          filter_concept.appendChild(document.createElement('option'));
	  filter_concept.selectedIndex = index + 1;
      });
}

function populateSubconcepts(){
  var filter_concept = document.getElementById('filter_concept');
  var concept_id;
  if(filter_concept.options[filter_concept.selectedIndex])
    concept_id = filter_concept.options[filter_concept.selectedIndex].value;
  $.getJSON($SCRIPT_ROOT + '/getSubconcepts', {concept_id:concept_id},function(data) {
          var filter_subconcept = document.getElementById('filter_subconcept');
          filter_subconcept.innerHTML = "";
          var data_array = data.result;
	  var index = 0;
          for(var i = 0; i < data_array.length; i++){
            var subconcept = data_array[i][1];
            var option = document.createElement('option');
            option.value = subconcept;
            option.text = subconcept;
            filter_subconcept.appendChild(option);
            index = i;
          }
          filter_subconcept.appendChild(document.createElement('option'));
          filter_subconcept.selectedIndex = index + 1;

      });
}

function populateTopics(){
  $.getJSON($SCRIPT_ROOT + '/getTopics', {},function(data) {
          var filter_topic = document.getElementById('filter_topic');
          filter_topic.innerHTML = "";
          var data_array = data.result;
	  var index = 0;
          for(var i = 0; i < data_array.length; i++){
            var topic = data_array[i][1];
            var option = document.createElement('option');
            option.value = topic;
            option.text = topic;
            filter_topic.appendChild(option);
	    index = i;
          }
          filter_topic.appendChild(document.createElement('option'));
	  filter_topic.selectedIndex = index + 1;
      });
}

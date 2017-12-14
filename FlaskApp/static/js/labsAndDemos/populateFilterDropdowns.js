function populateFilterDropdowns() {
    populateTopics();
    populateConcepts();
    populateSubconcepts();
}

function populateConcepts(){
  $.getJSON('/getConcepts', {},function(data) {
          var filter_concept = document.getElementById('filter_concept');
          filter_concept.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var concept = data_array[i][1];
            var option = document.createElement('option');
            option.value = concept;
            option.text = concept;
            filter_concept.appendChild(option);
          }
      });
}

function populateSubconcepts(){
  $.getJSON('/getSubconcepts', {},function(data) {
          var filter_subconcept = document.getElementById('filter_subconcept');
          filter_subconcept.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var subconcept = data_array[i][1];
            var option = document.createElement('option');
            option.value = subconcept;
            option.text = subconcept;
            filter_subconcept.appendChild(option);
          }
      });
}

function populateTopics(){
  $.getJSON('/getTopics', {},function(data) {
          var filter_topic = document.getElementById('filter_topic');
          filter_topic.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var topic = data_array[i][1];
            var option = document.createElement('option');
            option.value = topic;
            option.text = topic;
            filter_topic.appendChild(option);
          }
      });
}

var populateEditModal = function(button) {
    var tr = button.closest('tr');
    var lab_id = tr.id;
    window.sessionStorage.setItem('lab_id', lab_id);
    populateRequiredItems();
    $.getJSON('/getLab', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var edit_name = document.getElementById('edit_name');
        var edit_topic = document.getElementById('edit_topic');
        var edit_concept = document.getElementById('edit_concept');
        var edit_subconcept = document.getElementById('edit_subconcept');
        var edit_lab_rad = document.getElementById('edit_lab_rad');
        var edit_demo_rad = document.getElementById('edit_demo_rad');
        var edit_id = document.getElementById('edit_id');

        var data_array = data.result;
        var lab_data = data_array[0];
        edit_id.value = lab_data[0];
        edit_name.value = lab_data[2];
        var topic = lab_data[3];
        var concept = lab_data[4];
        var subconcept = lab_data[5];

        if (lab_data[1].toLowerCase() === "lab") {
            edit_lab_rad.checked = true;
            edit_demo_rad.checked = false;
        } else {
            edit_lab_rad.checked = false;
            edit_demo_rad.checked = true;
        }
        populateEditConcepts();
        populateEditTopics();
        populateEditSubconcepts();
        $(document).on('change',"#edit_concept", function() {
          populateEditSubconcepts();
        });
    });
}

function populateEditConcepts(selected){
  $.getJSON('/getConcepts', {},function(data) {
          var edit_concept = document.getElementById('edit_concept');
          edit_concept.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var concept = data_array[i][1];
            var concept_id = data_array[i][0];
            var option = document.createElement('option');
            option.value = concept_id;
            option.text = concept;
            edit_concept.appendChild(option);
            if(concept === selected)
              edit_concept.selectedIndex = i;
          }

      });
}

function populateEditSubconcepts(selected){
  var filter_concept = document.getElementById('edit_concept');
  var concept_id;
  if(filter_concept.options[filter_concept.selectedIndex])
    concept_id = filter_concept.options[filter_concept.selectedIndex].value;
  $.getJSON('/getSubconcepts', {concept_id:concept_id},function(data) {
          var edit_subconcept = document.getElementById('edit_subconcept');
          edit_subconcept.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var subconcept = data_array[i][1];
            var option = document.createElement('option');
            option.value = subconcept;
            option.text = subconcept;
            edit_subconcept.appendChild(option);
            if(subconcept === selected)
              edit_subconcept.selectedIndex = i;
          }
      });
}

function populateEditTopics(selected){
  $.getJSON('/getTopics', {},function(data) {
          var edit_topic = document.getElementById('edit_topic');
          edit_topic.innerHTML = "";
          var data_array = data.result;
          for(var i = 0; i < data_array.length; i++){
            var topic = data_array[i][1];
            var option = document.createElement('option');
            option.value = topic;
            option.text = topic;
            edit_topic.appendChild(option);
            if(topic === selected)
              edit_topic.selectedIndex = i;
          }
      });
}

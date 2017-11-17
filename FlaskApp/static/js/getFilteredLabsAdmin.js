var populateEditModal = function(button) {
  var tr = button.closest('tr');
  var lab_id = tr.id;
  window.sessionStorage.setItem('lab_id',lab_id);
  $.getJSON('/getLab',{lab_id:lab_id},function(data){
    console.log(data.result);
    var edit_name = document.getElementById('edit_name');
    var edit_topic = document.getElementById('edit_topic');
    var edit_concept = document.getElementById('edit_concept');
    var edit_subconcept = document.getElementById('edit_subconcept');
    var edit_lab_rad = document.getElementById('edit_lab_rad');
    var edit_demo_rad = document.getElementById('edit_demo_rad');

    var data_array = data.result;
    var lab_data = data_array[0];

    edit_name.value = lab_data[2];
    edit_topic.value = lab_data[3];
    edit_concept.value = lab_data[4];
    edit_subconcept.value = lab_data[5];

    if(lab_data[1].toLowerCase() === "lab"){
      edit_lab_rad.checked = true;
      edit_demo_rad.checked = false;
    } else {
      edit_lab_rad.checked = false;
      edit_demo_rad.checked = true;
    }

  });
}

var editLabDemo = function(){
  var lab_id = window.sessionStorage.getItem('lab_id');
  var editname=document.getElementById('edit_name').value;
  var topic=document.getElementById('edit_topic').value;
  var concept=document.getElementById('edit_concept').value;
  var subconcept=document.getElementById('edit_subconcept').value;
  var lab=document.getElementById('edit_lab_rad');
  var demo=document.getElementById('edit_demo_rad');
  var type = "LAB";
  if(demo.checked)
    type = "DEMO";
  $.getJSON('/addLab',{type:type,name:name,topic:topic,concept:concept,subconcept:subconcept},function(data){return false;});
}

var populateRequiredItems = function(button){
  var lab_id = window.sessionStorage.getItem('lab_id');

  $.getJSON('/getLabItems',{lab_id:lab_id},function(data){
    console.log(data.result);
    var add_current_items = document.getElementById('addCurrentItems');

    var data_array = data.result;

    for(var i = 0; i < data_array.length; i++){
      var curr_item = data_array[i];

    }

  });
}

/*var acceptRequest = function(button){
  console.log(button);
  var tr = button.closest('tr');
  var index = parseInt(tr.cells[0].innerHTML) - 1;
  var row_banner_id = tr.cells[6].innerHTML;
  var row_first_name = tr.cells[1].innerHTML;
  var row_middle_name = tr.cells[2].innerHTML;
  var row_last_name = tr.cells[3].innerHTML;
  var row_username = tr.cells[5].innerHTML;
  var row_email = tr.cells[4].innerHTML;
  var row_role = tr.cells[7].innerHTML;
  acceptUserRequest(row_banner_id,row_first_name,row_middle_name,row_last_name,row_username,row_role,row_email);
};*/


var getFilteredLabsDemos = function(){
  var select_type = document.getElementById('filter_type');
  var filter_type = select_type.options[select_type.selectedIndex].value.toLowerCase();
  console.log("TYPE: " + filter_type);
  var filter_name = document.getElementById('filter_name').value.toLowerCase();
  var filter_topic = document.getElementById('filter_topic').value.toLowerCase();
  var filter_concept = document.getElementById('filter_concept').value.toLowerCase();
  var filter_subconcept = document.getElementById('filter_subconcept').value.toLowerCase();
  $.getJSON('/getFilteredLabsDemos',{input_type:filter_type,name:filter_name,topic:filter_topic,concept:filter_concept,subconcept:filter_subconcept},
  function(data){
    var data_array = data.result;
    var table = document.getElementById('tablebody');
    table.innerHTML = "";
    for(var curr_lab = 0; curr_lab < data_array.length; curr_lab++){
      var item = data_array[curr_lab];
      var type = item[1];
      var name = item[2];
      var topic = item[3];
      var concept = item[4];
      var subconcept = item[5];
      var lab_id = item[0];



      var newRow = document.createElement("tr");
      newRow.id = lab_id;
      var rowIndex = document.createElement("td")
      rowIndex.innerHTML = (curr_lab + 1);
      var type_td = document.createElement("td");
      type_td.innerHTML = type;
      var name_td = document.createElement("td");
      name_td.innerHTML = name;
      var topic_td = document.createElement("td");
      topic_td.innerHTML = topic;
      var concept_td = document.createElement("td");
      concept_td.innerHTML = concept;
      var subconcept_td = document.createElement("td");
      subconcept_td.innerHTML = subconcept;

      newRow.appendChild(rowIndex);
      newRow.appendChild(type_td);
      newRow.appendChild(name_td);
      newRow.appendChild(topic_td);
      newRow.appendChild(concept_td);
      newRow.appendChild(subconcept_td);


      var edit_td = document.createElement('td');
      var edit_p = document.createElement('p');
      edit_p.setAttribute('data-placement','top');
      edit_p.setAttribute('data-toggle','tooltip');
      edit_p.setAttribute('title','Edit');
      var edit_btn = document.createElement('button');
      edit_btn.setAttribute('class','btn btn-primary btn-xs');
      edit_btn.setAttribute('data-title','Edit');
      edit_btn.setAttribute('data-toggle','modal');
      edit_btn.setAttribute('data-target','#edit');
      var edit_span = document.createElement('span');
      edit_span.setAttribute('class', 'glyphicon glyphicon-pencil');
      edit_btn.appendChild(edit_span);
      edit_p.appendChild(edit_btn);
      edit_td.appendChild(edit_p);

      var delete_td = document.createElement('td');
      var delete_p = document.createElement('p');
      delete_p.setAttribute('data-placement','top');
      delete_p.setAttribute('data-toggle','tooltip');
      delete_p.setAttribute('title','Edit');
      var delete_btn = document.createElement('button');
      delete_btn.setAttribute('class','btn btn-danger btn-xs');
      delete_btn.setAttribute('data-title','Delete');
      delete_btn.setAttribute('data-toggle','modal');
      delete_btn.setAttribute('data-target','#delete');
      var delete_span = document.createElement('span');
      delete_span.setAttribute('class', 'glyphicon glyphicon-trash');

      delete_btn.appendChild(delete_span);
      delete_p.appendChild(delete_btn);
      delete_td.appendChild(delete_p);

      newRow.appendChild(edit_td);
      newRow.appendChild(delete_td);


      table.appendChild(newRow);
      edit_btn.onclick = function(){populateEditModal(this);};

    }

  });
}
$(function() {
  getFilteredLabsDemos();
  document.getElementById('filter_submit').addEventListener('click',function(e){
    e.preventDefault();
    getFilteredLabsDemos();
  });
  document.getElementById('modal_add_item').addEventListener('click',function(){
    editLabDemo();
    populateRequiredItems();
  });
  return false;
});

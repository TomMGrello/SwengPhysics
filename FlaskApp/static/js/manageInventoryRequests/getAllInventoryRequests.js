var getAllInventoryRequests = function() {
  $.getJSON("/getAllInventoryRequests",{},function(data){
    var data_result = data.result;
    var requests_table = document.getElementById('requests_table');
    requests_table.innerHTML = "";
    for(var curr_request = 0; curr_request < data_result.length; curr_request++){
      var curr_data = data_result[curr_request];
      var request_id =curr_data[0];
      var dates = curr_data[2];
      var time_needed = curr_data[3];
      var classroom = curr_data[4];
      var num_items = curr_data[6];
      var item_name = curr_data[10];
      var serial_num = curr_data[10];
      var username = curr_data[19];
      console.log(curr_data);

      var newRow = document.createElement('tr');
      newRow.id = request_id;
      var rowIndex_td = document.createElement('td');
      rowIndex_td.innerHTML = (curr_request+1);
      var date_td = document.createElement('td');
      date_td.innerHTML = dates;
      var time_td = document.createElement('td');
      time_td.innerHTML = time_needed;
      var requested_td = document.createElement('td');
      requested_td.innerHTML = username;
      var item_name_td = document.createElement('td');
      item_name_td.innerHTML = item_name;
      var serial_num_td = document.createElement('td');
      serial_num_td.innerHTML = serial_num;
      var classroom_td = document.createElement('td');
      classroom_td.innerHTML = classroom;
      var num_items_td = document.createElement('td');
      num_items_td.innerHTML = num_items;

      var button_td = document.createElement('td');
      button_td.setAttribute('class','text-center');
      var approve_a = document.createElement('a');
      approve_a.setAttribute('class','btn btn-info btn-xs');
      approve_a.innerHTML = "Approve";
      var approve_span = document.createElement('span');
      approve_span.setAttribute('class','glyphicon glyphicon-ok');
      approve_a.appendChild(approve_span);
      button_td.appendChild(approve_a);
      var reject_a = document.createElement('a');
      reject_a.setAttribute('class','btn btn-danger btn-xs');
      reject_a.innerHTML = "Reject";
      var reject_span = document.createElement('span');
      reject_span.setAttribute('class','glyphicon glyphicon-remove');
      reject_a.appendChild(reject_span);
      button_td.appendChild(reject_a);

      approve_a.onclick = function(){acceptInventoryRequest(this);};
      reject_a.onclick = function(){rejectInventoryRequest(this);};

      newRow.appendChild(rowIndex_td);
      newRow.appendChild(date_td);
      newRow.appendChild(time_td);
      newRow.appendChild(requested_td);
      newRow.appendChild(item_name_td);
      newRow.appendChild(serial_num_td);
      newRow.appendChild(classroom_td);
      newRow.appendChild(num_items_td);
      newRow.appendChild(button_td);

      requests_table.appendChild(newRow);

    }

    return false;
  });
}

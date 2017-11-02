var deleteRequest = function(button){
  console.log(button);
  var tr = button.closest('tr');
  var row_banner_id = tr.cells[6].innerHTML;
  var row_role = tr.cells[7].innerHTML;
  deleteUserRequest(row_banner_id,row_role);
};

var acceptRequest = function(button){
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
};

$(function() {
  $.getJSON('/getAllUserRequests',{},
  function(data){
    var data_array = data.result;
    var requestsTable = document.getElementById("requestsTable");
    for(var curr_user = 0; curr_user < data_array.length; curr_user++){
      //For each user...

      var curr_user_data = data_array[curr_user];
      var data_banner_id = curr_user_data[1];
      var data_first_name = curr_user_data[2];
      var data_middle_name = curr_user_data[3];
      var data_last_name = curr_user_data[4];
      var data_username  = curr_user_data[5];
      var data_role  = curr_user_data[6];
      var data_email  = curr_user_data[7];


      var newRow = document.createElement("tr");
      newRow.id = "row";
      var rowIndex = document.createElement("td")
      rowIndex.id = "index";
      rowIndex.innerHTML = (curr_user + 1);
      var first_name = document.createElement("td");
      first_name.id = "first_name";
      first_name.innerHTML = data_first_name;
      var middle_name = document.createElement("td");
      middle_name.id = "middle_name";
      middle_name.innerHTML = data_middle_name;
      var last_name = document.createElement("td");
      last_name.id = "last_name";
      last_name.innerHTML = data_last_name;
      var email = document.createElement("td");
      email.id = "email";
      email.innerHTML = data_email;
      var username = document.createElement("td");
      username.id = "username";
      username.innerHTML = data_username;
      var banner_id = document.createElement("td");
      banner_id.id = "banner_id";
      banner_id.innerHTML = data_banner_id;
      var role = document.createElement("td");
      role.id = "role";
      role.innerHTML = data_role;

      newRow.appendChild(rowIndex);
      newRow.appendChild(first_name);
      newRow.appendChild(middle_name);
      newRow.appendChild(last_name);
      newRow.appendChild(email);
      newRow.appendChild(username);
      newRow.appendChild(banner_id);
      newRow.appendChild(role);

      var button_area = document.createElement("td");
      button_area.className = "text-center";
      button_area.id = "button_area" + curr_user;
      var btn_approve = document.createElement("a");
      btn_approve.className = "btn btn-info btn-xs";
      btn_approve.href = "#";
      btn_approve.id = "btn_approve" + curr_user;
      btn_approve.innerHTML = "Approve";
      var span_btn_approve = document.createElement("span");
      span_btn_approve.className = "glyphicon glyphicon-ok";
      var btn_reject = document.createElement("a");
      btn_reject.className = "btn btn-danger btn-xs";
      btn_reject.href = "#";
      btn_reject.id = "btn_reject" + curr_user;
      btn_reject.innerHTML = "Reject";
      var span_btn_reject = document.createElement("span");
      span_btn_reject.className = "glyphicon glyphicon-remove";

      btn_approve.appendChild(span_btn_approve);
      button_area.appendChild(btn_approve);
      btn_reject.appendChild(span_btn_reject);
      button_area.appendChild(btn_reject);

      newRow.appendChild(button_area);

      requestsTable.appendChild(newRow);

      btn_reject.onclick = function(){deleteRequest(this);};
      btn_approve.onclick = function(){acceptRequest(this)};
    }

  });
  return false;
});

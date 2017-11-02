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
      newRow.id = "row" + curr_user;
      var rowIndex = document.createElement("td")
      rowIndex.id = "index" + curr_user;
      rowIndex.innerHTML = (curr_user + 1);
      var first_name = document.createElement("td");
      first_name.id = "first_name" + curr_user;
      first_name.innerHTML = data_first_name;
      var middle_name = document.createElement("td");
      middle_name.id = "middle_name" + curr_user;
      middle_name.innerHTML = data_middle_name;
      var last_name = document.createElement("td");
      last_name.id = "last_name" + curr_user;
      last_name.innerHTML = data_last_name;
      var email = document.createElement("td");
      email.id = "email" + curr_user;
      email.innerHTML = data_email;
      var username = document.createElement("td");
      username.id = "username" + curr_user;
      username.innerHTML = data_username;
      var banner_id = document.createElement("td");
      banner_id.id = "banner_id" + curr_user;
      banner_id.innerHTML = data_banner_id;
      var role = document.createElement("td");
      role.id = "role" + curr_user;
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

      btn_reject.onclick = function(button){
        var tr = button.parentElement;
        deleteUserRequest(data_banner_id,data_role)
      };
      btn_approve.onclick = function(button){acceptUserRequest(data_banner_id,data_first_name,data_middle_name,data_last_name,data_username,data_role,data_email)};
    }

  });
  return false;
});

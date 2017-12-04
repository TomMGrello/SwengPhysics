var getUserPermissions = function() {
    $.getJSON('/getAllUsers', function(data){
        var data_array = data.result;
        console.log(data_array);
        var table = document.getElementById('tablebody');
        for (var curr_item = 0; curr_item < data_array.length; curr_item++) {
            var user = data_array[curr_item];
            var first = user[0];
            var middle = user[1];
            var last = user[2];
            var uname = user[3];

            var newRow = document.createElement("tr");

            var rowIndex = document.createElement("td");
            rowIndex.id = "index";
            rowIndex.innerHTML = (curr_item + 1);
            var firstNameTd = document.createElement("td");
            firstNameTd.id = "first_name";
            firstNameTd.innerHTML = first;
            var middleNameTd = document.createElement("td");
            middleNameTd.id = "middle_name";
            middleNameTd.innerHTML = middle;
            var lastNameTd = document.createElement("td");
            lastNameTd.id = "last_name";
            lastNameTd.innerHTML = last;
            var unameTd = document.createElement("td");
            unameTd.id = "uname";
            unameTd.innerHTML = uname;

            newRow.appendChild(rowIndex);
            newRow.appendChild(firstNameTd);
            newRow.appendChild(middleNameTd);
            newRow.appendChild(lastNameTd);
            newRow.appendChild(unameTd);

            var edit_td = document.createElement('td');
            var edit_p = document.createElement('p');
            edit_p.setAttribute('data-placement', 'top');
            edit_p.setAttribute('data-toggle', 'tooltip');
            edit_p.setAttribute('title', 'Edit');
            var edit_btn = document.createElement('button');
            edit_btn.setAttribute('class', 'btn btn-primary btn-xs');
            edit_btn.setAttribute('data-title', 'Edit');
            edit_btn.setAttribute('data-toggle', 'modal');
            edit_btn.setAttribute('data-target', '#edit');
            var edit_span = document.createElement('span');
            edit_span.setAttribute('class', 'glyphicon glyphicon-pencil');
            edit_btn.appendChild(edit_span);
            edit_p.appendChild(edit_btn);
            edit_td.appendChild(edit_p);

            var delete_td = document.createElement('td');
            var delete_p = document.createElement('p');
            delete_p.setAttribute('data-placement', 'top');
            delete_p.setAttribute('data-toggle', 'tooltip');
            delete_p.setAttribute('title', 'Delete');
            var delete_btn = document.createElement('button');
            delete_btn.setAttribute('class', 'btn btn-danger btn-xs');
            delete_btn.setAttribute('data-title', 'Delete');
            delete_btn.setAttribute('data-toggle', 'modal');
            delete_btn.setAttribute('data-target', '#delete');
            var delete_span = document.createElement('span');
            delete_span.setAttribute('class', 'glyphicon glyphicon-trash');

            edit_btn.appendChild(edit_span);
            edit_p.appendChild(edit_btn);
            edit_td.appendChild(edit_p);

            delete_btn.appendChild(delete_span);
            delete_p.appendChild(delete_btn);
            delete_td.appendChild(delete_p);

            newRow.appendChild(edit_td);
            newRow.appendChild(delete_td);


            table.appendChild(newRow);
        }
    });
    $.getJSON('/allUserPermissions', function(data){
        var data_array = data.result;
        console.log(data_array);
    });
}

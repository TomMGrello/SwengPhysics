var getFilteredLabsAdmin = function() {
    var select_type = document.getElementById('filter_type');
    var filter_type = select_type.options[select_type.selectedIndex].value.toLowerCase();
    console.log("TYPE: " + filter_type);
    var filter_name = document.getElementById('filter_name').value.toLowerCase();
    var filter_topic = document.getElementById('filter_topic').value.toLowerCase();
    var filter_concept = document.getElementById('filter_concept').value.toLowerCase();
    var filter_subconcept = document.getElementById('filter_subconcept').value.toLowerCase();
    $.getJSON('/getFilteredLabsDemos', {
            input_type: filter_type,
            name: filter_name,
            topic: filter_topic,
            concept: filter_concept,
            subconcept: filter_subconcept
        },
        function(data) {
            var data_array = data.result;
            var table = document.getElementById('tablebody');
            table.innerHTML = "";
            for (var curr_lab = 0; curr_lab < data_array.length; curr_lab++) {
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
                delete_p.setAttribute('title', 'Edit');
                var delete_btn = document.createElement('button');
                delete_btn.setAttribute('class', 'btn btn-danger btn-xs');
                delete_btn.setAttribute('data-title', 'Delete');
                delete_btn.setAttribute('data-toggle', 'modal');
                delete_btn.setAttribute('data-target', '#delete');
                var delete_span = document.createElement('span');
                delete_span.setAttribute('class', 'glyphicon glyphicon-trash');

                delete_btn.appendChild(delete_span);
                delete_p.appendChild(delete_btn);
                delete_td.appendChild(delete_p);

                newRow.appendChild(edit_td);
                newRow.appendChild(delete_td);


                table.appendChild(newRow);
                edit_btn.onclick = function() {
                    populateEditModal(this);
                };

            }

        });
}

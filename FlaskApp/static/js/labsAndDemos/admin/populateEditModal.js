var populateEditModal = function(button) {
    var tr = button.closest('tr');
    var lab_id = tr.id;
    window.sessionStorage.setItem('lab_id', lab_id);
    populateRequiredItems();
    $.getJSON($SCRIPT_ROOT + '/getLab', {
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
        edit_topic.value = lab_data[3];
        edit_concept.value = lab_data[4];
        edit_subconcept.value = lab_data[5];

        if (lab_data[1].toLowerCase() === "lab") {
            edit_lab_rad.checked = true;
            edit_demo_rad.checked = false;
        } else {
            edit_lab_rad.checked = false;
            edit_demo_rad.checked = true;
        }

    });
}

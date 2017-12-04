var populateInfoModal = function(button) {
    var tr = button.closest('tr');
    var lab_id = tr.id;
    window.sessionStorage.setItem('lab_id', lab_id);
    populateRequiredInfoItems();
    $.getJSON('/getLab', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var info_name = document.getElementById('info_name');
        var info_topic = document.getElementById('info_topic');
        var info_concept = document.getElementById('info_concept');
        var info_subconcept = document.getElementById('info_subconcept');
        var info_lab_rad = document.getElementById('info_lab_rad');
        var info_demo_rad = document.getElementById('info_demo_rad');

        var data_array = data.result;
        var lab_data = data_array[0];

        info_name.value = lab_data[2];
        info_topic.value = lab_data[3];
        info_concept.value = lab_data[4];
        info_subconcept.value = lab_data[5];

        info_lab_demo.value = lab_data[1];

    });
}

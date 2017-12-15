var editLabDemo = function() {
    var lab_id = window.sessionStorage.getItem('lab_id');
    var name = document.getElementById('edit_name').value;
    var topic = document.getElementById('edit_topic').value;
    var concept = document.getElementById('edit_concept').value;
    var subconcept = document.getElementById('edit_subconcept').value;
    var lab = document.getElementById('edit_lab_rad');
    var demo = document.getElementById('edit_demo_rad');
    var type = "LAB";
    if (demo.checked)
        type = "DEMO";
    $.getJSON($SCRIPT_ROOT + '/editLab', {
        lab_id: lab_id,
        type: type,
        name: name,
        topic: topic,
        concept: concept,
        subconcept: subconcept
    }, function(data) {
        console.log("EDITED");
        location.reload();
        return false;
    });
}

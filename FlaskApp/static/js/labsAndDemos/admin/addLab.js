$(function() {

    document.getElementById('new_lab_btn').addEventListener('click', function(e) {
        e.preventDefault();
        var name = document.getElementById('input_name').value;
        var topic = document.getElementById('input_topic').value;
        var concept = document.getElementById('input_concept').value;
        var subconcept = document.getElementById('input_subconcept').value;
        var lab = document.getElementById('input_lab');
        var demo = document.getElementById('input_demo');
        var type = "LAB";
        if (demo.checked)
            type = "DEMO";
        $.getJSON('/addLab', {
            type: type,
            name: name,
            topic: topic,
            concept: concept,
            subconcept: subconcept
        }, function(data) {
            var lab_id = data.result[0];
            console.log(data.result);
            alert("LAB ID: " + lab_id);
            uploadFile(lab_id);
            return false;
        });
    });

});

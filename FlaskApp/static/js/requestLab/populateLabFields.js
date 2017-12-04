var populateLabFields = function() {
    var lab_id = window.sessionStorage.getItem('lab_id');
    $.getJSON('/getLab', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var lab = document.getElementById('lab');
        var data_array = data.result;
        var lab_data = data_array[0];

        lab.value = lab_data[2];
    });
}

function populateInventoryLocations() {
    $.getJSON($SCRIPT_ROOT + '/getLocations', {
            type:"inventory"
        },
        function(data) {
            var modify_location = document.getElementById('modify_location');
            var add_location = document.getElementById('add_location');
            modify_location.innerHTML = "";
            add_location.innerHTML = "";
            var data_array = data.result;
            for(var i = 0; i < data_array.length; i++){
              var location = data_array[i];
              var location_id = location[0];
              var building = location[1];
              var room_num = location[2];
              var option = document.createElement('option');
              option.value = location_id;
              option.text = building + " " + room_num;
              var option2 = document.createElement('option');
              option2.value = location_id;
              option2.text = building + " " + room_num;
              modify_location.appendChild(option);
              add_location.appendChild(option2);
            }
        });
}

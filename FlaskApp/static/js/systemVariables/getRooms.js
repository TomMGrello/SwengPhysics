var getRooms = function() {
    $.getJSON('/getLocations', {type:"classroom"}, function(data) {
      var classroom_select = document.getElementById('lab_classrooms_select');
      var data_result = data.result;
      for(var i = 0; i < data_result.length; i++){
        var location = data_result[i];
        var building = location[1];
        var room_num = location[2];
        var location_id = location[0];
        var option = document.createElement('option');
        option.value = location_id;
        option.text = building + " " + room_num;
        classroom_select.appendChild(option);
      }
    });

      $.getJSON('/getLocations', {type:"inventory"}, function(data) {
        var storage_select = document.getElementById('storage_select');
        var data_result = data.result;
        for(var i = 0; i < data_result.length; i++){
          var location = data_result[i];
          var building = location[1];
          var room_num = location[2];
          var location_id = location[0];
          var option = document.createElement('option');
          option.value = location_id;
          option.text = building + " " + room_num;
          storage_select.appendChild(option);
        }
      });

    return false;

}

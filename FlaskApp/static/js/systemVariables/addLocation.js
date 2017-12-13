var addLocation = function(location_type,building,room_num) {
    $.getJSON('/addLocation', {
        building:building,
        room_num:room_num,
        type:location_type
    },
    function(data) {
      location.reload();
    });
    return false;
}

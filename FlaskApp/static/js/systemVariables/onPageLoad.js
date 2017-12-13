$(function() {
    getAllConstants();
    getRooms();
    getAllCourses();
    document.getElementById('btn_auto_accept').onclick = function(){
      updateAutoAccept();
    };

    document.getElementById('btn_start_date').onclick = function(){
      updateStartDate();
    };

    document.getElementById('btn_end_date').onclick = function(){
      updateEndDate();
    };

    document.getElementById('btn_remove_course').onclick = function(){
      removeCourse();
    };

    document.getElementById('btn_add_course').onclick = function(){
      addCourse();
    };

    document.getElementById('btn_num_teams').onclick = function(){
      updateNumTeams();
    };

    document.getElementById('btn_remove_storage').onclick = function(){
      var storage_select = document.getElementById('storage_select');
      var location_id = storage_select.options[storage_select.selectedIndex].value;
      removeLocation(location_id);
    }

    document.getElementById('btn_remove_lab_classroom').onclick = function(){
      var lab_classrooms_select = document.getElementById('lab_classrooms_select');
      var location_id = lab_classrooms_select.options[lab_classrooms_select.selectedIndex].value;
      removeLocation(location_id);
    }

    document.getElementById('btn_add_lab_classroom').onclick = function(){
      var building = document.getElementById('lab_building_name').value;
      var room_num = document.getElementById('lab_room_number').value;
      addLocation("classroom",building,room_num);
    }

    document.getElementById('btn_add_storage').onclick = function(){
      var building = document.getElementById('storage_building_name').value;
      var room_num = document.getElementById('storage_room_number').value;
      addLocation("inventory",building,room_num);
    }
});

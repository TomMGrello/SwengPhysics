var addCourse = function() {
  var course_name = document.getElementById('add_course').value;
    $.getJSON($SCRIPT_ROOT + '/addCourse', {name:course_name}, function(data) {
      location.reload();
    });
    return false;
}

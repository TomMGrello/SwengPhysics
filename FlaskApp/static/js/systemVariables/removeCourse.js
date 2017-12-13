var removeCourse = function() {
  var course_select = document.getElementById('course_select');
  var course_id = course_select.options[course_select.selectedIndex].value;
  console.log("COURSE ID: " + course_id);
    $.getJSON('/removeCourse', {course_id:course_id}, function(data) {
      location.reload();
    });
    return false;
}

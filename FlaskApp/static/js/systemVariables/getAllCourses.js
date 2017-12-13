var getAllCourses = function() {
    $.getJSON('/getAllCourses', {}, function(data) {
      var course_select = document.getElementById('course_select');
      var data_result = data.result;
      for(var i = 0; i < data_result.length; i++){
        var course_name = data_result[i][1];
        var course_id = data_result[i][0];
        var option = document.createElement('option');
        option.value = course_id;
        option.text = course_name;
        course_select.appendChild(option);
      }
    });
    return false;
}

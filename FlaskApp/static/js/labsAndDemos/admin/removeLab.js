var removeLab = function() {
  var lab_id = window.sessionStorage.getItem('lab_id');
  $.getJSON('/removeLab', {
      lab_id:lab_id
  }, function(data) {
      location.reload();
      return false;
  });
}

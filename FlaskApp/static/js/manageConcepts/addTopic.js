var addTopic = function() {
  var topic_name = document.getElementById('topic').value;
    $.getJSON($SCRIPT_ROOT + '/addTopic', {name:topic_name}, function(data) {
      location.reload();
    });
    return false;
}

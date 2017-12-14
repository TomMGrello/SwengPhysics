var addTopic = function() {
  var topic_name = document.getElementById('topic').value;
    $.getJSON('/addTopic', {name:topic_name}, function(data) {
      location.reload();
    });
    return false;
}

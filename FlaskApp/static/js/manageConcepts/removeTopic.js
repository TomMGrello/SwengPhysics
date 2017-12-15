var removeTopic = function() {
  var topic_select = document.getElementById('topic_select');
  var topic_id = topic_select.options[topic_select.selectedIndex].value;
    $.getJSON('/removeTopic', {topic_id:topic_id}, function(data) {
      location.reload();
    });
    return false;
}

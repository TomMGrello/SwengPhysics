var getTopics = function() {
  var topic_select = document.getElementById('topic_select');
    $.getJSON('/getTopics', {}, function(data) {
      var topics = data.result;
      for(var i = 0; i < topics.length; i++){
        var curr_topic = topics[i];
        var topic_id = curr_topic[0];
        var topic_name = curr_topic[1];
        var option = document.createElement('option');
        option.value = topic_id;
        option.text = topic_name;
        topic_select.appendChild(option);
      }
    });
    return false;
}

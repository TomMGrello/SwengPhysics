$(function() {
    getTopics();
    document.getElementById('topic_add').onclick = function(){
      addTopic();
    };
    document.getElementById('topic_remove').onclick = function(){
      removeTopic();
    };
});

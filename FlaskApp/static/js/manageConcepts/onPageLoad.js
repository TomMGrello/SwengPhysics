$(function() {
    getTopics();
    getConcepts();
    getSubconcepts();
    document.getElementById('topic_add').onclick = function(){
      addTopic();
    };
    document.getElementById('topic_remove').onclick = function(){
      removeTopic();
    };
    document.getElementById('add_concept_btn').onclick = function(){
      addConcept();
    };
    document.getElementById('add_subconcept_btn').onclick = function(){
      addSubconcept();
    };
    document.getElementById('move_subconcept_btn').onclick = function(){
      moveSubconcept();
    };
    document.getElementById('remove_subconcept_btn').onclick = function(){
      removeSubconcept();
    };
    document.getElementById('remove_concept_btn').onclick = function(){
      removeConcept();
    };
});

$(function() {
    populateLabFields();
    document.getElementById('btn_submit').addEventListener('click',function(e){
      e.preventDefault();
      addLabRequest();
    });
    return false;
});

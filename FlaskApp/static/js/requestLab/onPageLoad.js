$(function() {
    populateLabFields();
    document.getElementById('btn_submit').addEventListener('click',function(){
      addLabRequest();
    });
    return false;
});

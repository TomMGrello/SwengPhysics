$(function() {
    populateInventoryFields();
    document.getElementById('btn_submit').addEventListener('click',function(e){
      e.preventDefault();
      addInventoryRequest();
    });
    return false;
});

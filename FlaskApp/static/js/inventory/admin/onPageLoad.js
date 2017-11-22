$(function() {
  getFilteredInventoryAdmin();
  document.getElementById('btn_filter').addEventListener('click',function(e){
    e.preventDefault();
    getFilteredInventoryAdmin();
  });
  document.getElementById('btn_search').addEventListener('click',function(e){
    e.preventDefault();
    getFilteredInventoryAdmin();
  });
  document.getElementById('remove_btn').addEventListener('click', function(){
    removeInventoryItem(window.sessionStorage.getItem('serial_num_to_remove'));
  });
  return false;
});

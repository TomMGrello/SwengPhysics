$(function() {
  getFilteredInventory();
  document.getElementById('btn_filter').addEventListener('click',function(e){
    e.preventDefault();
    getFilteredInventory();
  });
  document.getElementById('btn_search').addEventListener('click',function(e){
    e.preventDefault();
    getFilteredInventory();
  });
  return false;
});

$(function() {
  getFilteredInventory(null);
  document.getElementById('btn_filter').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory(null);
  });
  document.getElementById('btn_search').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory(null);
  });
  document.getElementById('th_serial').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("serial");
  });
  document.getElementById('th_name').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("name");
  });
  document.getElementById('th_quantity').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("quantity");
  });
  document.getElementById('th_location').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("location");
  });
  document.getElementById('th_shelf').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("shelf");
  });
  document.getElementById('th_vendor').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredInventory("vendor");
  });
  populateLocations();
    return false;
});

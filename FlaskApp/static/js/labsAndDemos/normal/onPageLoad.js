$(function() {
  getFilteredLabsDemos(null);
  document.getElementById('filter_submit').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos(null);
  });
  document.getElementById('th_type').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos("type");
  });
  document.getElementById('th_name').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos("name");
  });
  document.getElementById('th_topic').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos("topic");
  });
  document.getElementById('th_concept').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos("concept");
  });
  document.getElementById('th_subconcept').addEventListener('click', function(e) {
      e.preventDefault();
      getFilteredLabsDemos("subconcept");
  });

  populateFilterDropdowns();

    return false;
});

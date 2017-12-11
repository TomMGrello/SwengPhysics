$(function() {
    getFilteredLabsAdmin(null);
    document.getElementById('filter_submit').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin(null);
    });
    document.getElementById('th_type').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin("type");
    });
    document.getElementById('th_name').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin("name");
    });
    document.getElementById('th_topic').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin("topic");
    });
    document.getElementById('th_concept').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin("concept");
    });
    document.getElementById('th_subconcept').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin("subconcept");
    });
    document.getElementById('btn_add_item_to_lab').addEventListener('click', function() {
        addItemToLab();
    });
    document.getElementById('edit_update_btn').addEventListener('click', function() {
      //editLabDemo();
    });
    document.getElementById('remove_ok').addEventListener('click', function() {
        removeLab();
    });
    return false;
});

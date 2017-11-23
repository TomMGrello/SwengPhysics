$(function() {
    getFilteredLabsAdmin();
    document.getElementById('filter_submit').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsAdmin();
    });
    document.getElementById('modal_add_item').addEventListener('click', function() {
        editLabDemo();
    });
    document.getElementById('btn_add_item_to_lab').addEventListener('click', function() {
        addItemToLab();
    });
    document.getElementById('edit_update_btn').addEventListener('click', function() {
        editLabDemo();
        location.reload();
    });
    return false;
});

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
    })
    return false;
});

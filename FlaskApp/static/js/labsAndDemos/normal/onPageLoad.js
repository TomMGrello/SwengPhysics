$(function() {
    getFilteredLabsDemos();
    document.getElementById('filter_submit').addEventListener('click', function(e) {
        e.preventDefault();
        getFilteredLabsDemos();
    });
    return false;
});

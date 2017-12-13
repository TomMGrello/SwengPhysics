var setBannerIdToRemove = function(button) {
    var tr = button.closest('tr');
    var banner_id = tr.cells[4].innerHTML;
    window.sessionStorage.setItem('banner_id_to_remove', banner_id);
}

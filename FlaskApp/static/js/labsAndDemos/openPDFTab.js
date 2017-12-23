var openPDFTab = function(button) {
  var tr = button.closest('tr');
  var lab_id = tr.id;
  window.sessionStorage.setItem('lab_id', lab_id);
  var pdf_url = "protected" + lab_id + ".pdf";
  window.open(pdf_url,"_blank"); //"_blank" ensures that it opens in a new tab
}

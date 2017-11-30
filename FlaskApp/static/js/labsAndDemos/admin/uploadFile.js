//https://stackoverflow.com/questions/23980733/jquery-ajax-file-upload-php

var uploadFile = function(lab_id) {
    var all_files = document.getElementById('file_upload').files;
    console.log(all_files);
    var file_data = all_files[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(form_data);
    form_data.append('lab_id',lab_id);
    $.ajax({
                url: 'static/upload_pdf.php', // point to server-side PHP script
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                    console.log(php_script_response); // display response from the PHP script, if any
                }
     });
}

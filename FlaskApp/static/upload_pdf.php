<?php
    $filename = $_FILES['lab_id'] . '.pdf.';
    echo 'FILE NAME: ' . $filename
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'lab_pdfs/' . $filename);
    }

?>

var getFilteredInventoryAdmin = function(order_by) {
    var filter_name = document.getElementById('search_input').value.toLowerCase();
    var filter_vendor = document.getElementById('vendor_input').value.toLowerCase();
    var select_location = document.getElementById('location_select');
    var location_id;
    if(select_location.options[select_location.selectedIndex])
      location_id = select_location.options[select_location.selectedIndex].value;
    var filter_shelf = document.getElementById('shelf_input').value.toLowerCase();
    $.getJSON($SCRIPT_ROOT + '/getFilteredInventory', {
            name: filter_name,
            vendor_name: filter_vendor,
            location_id:location_id,
            shelf: filter_shelf,
            order_by:order_by
        },
        function(data) {
            var data_array = data.result;
            var table = document.getElementById('tablebody');
            table.innerHTML = "";
            for (var curr_item = 0; curr_item < data_array.length; curr_item++) {
              var item = data_array[curr_item];
              console.log(item);
              var name = item[2];
              var serial_num = item[3];
              var shelf = item[8];
              var building = item[10];
              var room_num = item[11];
              var invoice_id = item[13];
              var price = item[15];
              var date = item[19];
              var vendor = item[20];
              var quantity = item[7];

                var newRow = document.createElement("tr");
                newRow.id = serial_num;

                var rowIndex = document.createElement("td")
                rowIndex.id = "index";
                rowIndex.innerHTML = (curr_item + 1);
                rowIndex.setAttribute('data-title', 'Info');
                rowIndex.setAttribute('data-toggle', 'modal');
                rowIndex.setAttribute('data-target', '#info');
                var serial_num_td = document.createElement("td");
                serial_num_td.id = "serial_num";
                serial_num_td.innerHTML = serial_num;
                serial_num_td.setAttribute('data-title', 'Info');
                serial_num_td.setAttribute('data-toggle', 'modal');
                serial_num_td.setAttribute('data-target', '#info');
                var name_td = document.createElement("td");
                name_td.id = "name";
                name_td.innerHTML = name;
                name_td.setAttribute('data-title', 'Info');
                name_td.setAttribute('data-toggle', 'modal');
                name_td.setAttribute('data-target', '#info');
                var quantity_td = document.createElement("td");
                quantity_td.id = "quantity";
                quantity_td.innerHTML = quantity;
                quantity_td.setAttribute('data-title', 'Info');
                quantity_td.setAttribute('data-toggle', 'modal');
                quantity_td.setAttribute('data-target', '#info');
                var location_td = document.createElement("td");
                location_td.id = "location";
                location_td.innerHTML = building + " " + room_num;
                location_td.setAttribute('data-title', 'Info');
                location_td.setAttribute('data-toggle', 'modal');
                location_td.setAttribute('data-target', '#info');
                var shelf_td = document.createElement("td");
                shelf_td.id = "shelf";
                shelf_td.innerHTML = shelf;
                shelf_td.setAttribute('data-title', 'Info');
                shelf_td.setAttribute('data-toggle', 'modal');
                shelf_td.setAttribute('data-target', '#info');
                var vendor_td = document.createElement("td");
                vendor_td.id = "vendor";
                vendor_td.innerHTML = vendor;
                vendor_td.setAttribute('data-title', 'Info');
                vendor_td.setAttribute('data-toggle', 'modal');
                vendor_td.setAttribute('data-target', '#info');
                var purchase_date_td = document.createElement("td");
                purchase_date_td.id = "purchase_date";
                purchase_date_td.innerHTML = date;
                purchase_date_td.setAttribute('data-title', 'Info');
                purchase_date_td.setAttribute('data-toggle', 'modal');
                purchase_date_td.setAttribute('data-target', '#info');
                var price_td = document.createElement("td");
                price_td.id = "price";
                price_td.innerHTML = price;
                price_td.setAttribute('data-title', 'Info');
                price_td.setAttribute('data-toggle', 'modal');
                price_td.setAttribute('data-target', '#info');

                //Do e.stopPropagation() was not working, so I had to do this.
                //Also couldn't put all the elements inside a span or div, since that messes up the
                //table columns

                //This prevents the "edit" and "delete" buttons from also opening up the Info modal

                rowIndex.setAttribute('data-title', 'Info');
                rowIndex.setAttribute('data-toggle', 'modal');
                rowIndex.setAttribute('data-target', '#info');

                serial_num_td.setAttribute('data-title', 'Info');
                serial_num_td.setAttribute('data-toggle', 'modal');
                serial_num_td.setAttribute('data-target', '#info');

                name_td.setAttribute('data-title', 'Info');
                name_td.setAttribute('data-toggle', 'modal');
                name_td.setAttribute('data-target', '#info');

                quantity_td.setAttribute('data-title', 'Info');
                quantity_td.setAttribute('data-toggle', 'modal');
                quantity_td.setAttribute('data-target', '#info');

                location_td.setAttribute('data-title', 'Info');
                location_td.setAttribute('data-toggle', 'modal');
                location_td.setAttribute('data-target', '#info');

                shelf_td.setAttribute('data-title', 'Info');
                shelf_td.setAttribute('data-toggle', 'modal');
                shelf_td.setAttribute('data-target', '#info');

                vendor_td.setAttribute('data-title', 'Info');
                vendor_td.setAttribute('data-toggle', 'modal');
                vendor_td.setAttribute('data-target', '#info');

                purchase_date_td.setAttribute('data-title', 'Info');
                purchase_date_td.setAttribute('data-toggle', 'modal');
                purchase_date_td.setAttribute('data-target', '#info');

                price_td.setAttribute('data-title', 'Info');
                price_td.setAttribute('data-toggle', 'modal');
                price_td.setAttribute('data-target', '#info');

                newRow.appendChild(rowIndex);
                newRow.appendChild(serial_num_td);
                newRow.appendChild(name_td);
                newRow.appendChild(quantity_td);
                newRow.appendChild(location_td);
                newRow.appendChild(shelf_td);
                newRow.appendChild(vendor_td);
                //newRow.appendChild(purchase_date_td);
                //newRow.appendChild(price_td);

                var edit_td = document.createElement('td');
                var edit_p = document.createElement('p');
                edit_p.setAttribute('data-placement', 'top');
                edit_p.setAttribute('data-toggle', 'tooltip');
                edit_p.setAttribute('title', 'Edit');
                var edit_btn = document.createElement('button');
                edit_btn.setAttribute('class', 'btn btn-primary btn-xs');
                edit_btn.setAttribute('data-title', 'Edit');
                edit_btn.setAttribute('data-toggle', 'modal');
                edit_btn.setAttribute('data-target', '#edit');
                var edit_span = document.createElement('span');
                edit_span.setAttribute('class', 'glyphicon glyphicon-pencil');
                edit_btn.appendChild(edit_span);
                edit_p.appendChild(edit_btn);
                edit_td.appendChild(edit_p);

                var delete_td = document.createElement('td');
                var delete_p = document.createElement('p');
                delete_p.setAttribute('data-placement', 'top');
                delete_p.setAttribute('data-toggle', 'tooltip');
                delete_p.setAttribute('title', 'Delete');
                var delete_btn = document.createElement('button');
                delete_btn.setAttribute('class', 'btn btn-danger btn-xs');
                delete_btn.setAttribute('data-title', 'Delete');
                delete_btn.setAttribute('data-toggle', 'modal');
                delete_btn.setAttribute('data-target', '#delete');
                var delete_span = document.createElement('span');
                delete_span.setAttribute('class', 'glyphicon glyphicon-trash');

                delete_btn.onclick = function() {
                    setSerialNumToRemove(this);
                };

                edit_btn.onclick = function(){
                  populateEditModal(this);
                };

                newRow.onclick = function(e) {
                  populateInfoModal(this);
                };

                delete_btn.appendChild(delete_span);
                delete_p.appendChild(delete_btn);
                delete_td.appendChild(delete_p);

                newRow.appendChild(edit_td);
                newRow.appendChild(delete_td);


                table.appendChild(newRow);


            }

        });
}

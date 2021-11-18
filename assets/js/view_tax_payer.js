$(document).ready(function() {
    load_tax_payers();
});


function load_tax_payers() {
    $.ajax({
        type: "GET",
        url: '../controller/tax_payers_list.php',
        dataType: "json",
        success: function(res) {
            data = draw_tax_payers_table(res);
            $("#table-body").html(data);
            $("#taxpayerstable").DataTable();
        },

    });
    select_tax_payer();
    delete_tax_payer();
}

function draw_tax_payers_table(tax_payers) {
    var tax_payers_data = '';
    $.each(tax_payers, function(key, value) {
        tax_payers_data += '<tr>';
        tax_payers_data += '<td>' + value.TPIN + '</td>';
        tax_payers_data += '<td>' + value.BusinessCertificateNumber + '</td>';
        tax_payers_data += '<td>' + value.TradingName + '</td>';
        tax_payers_data += '<td>' + value.BusinessRegistrationDate + '</td>';
        tax_payers_data += '<td>' + value.MobileNumber + '</td>';
        tax_payers_data += '<td>' + value.Email + '</td>';
        tax_payers_data += '<td>' + value.PhysicalLocation + '</td>';
        tax_payers_data += '<td>' + value.Username + '</td>';
        tax_payers_data += "<td colspan='2' class='d-flex'><Button class='btn btn-outline-success btn-sm' id='editTaxPayer' data-id='" + value.id + "'> <i class='fa fa-pencil'></i></Button>&nbsp;&nbsp;&nbsp;<Button class='btn btn-outline-danger btn-sm mr-5' id='deleteTaxPayer' data-id1='" + value.TPIN + "'><i class='fa fa-trash'></i></Button></td>";
        tax_payers_data += '</tr>';
    });
    return tax_payers_data;
}


function select_tax_payer() {
    $(document).on('click', '#editTaxPayer', function() {
        var index = 1;
        $(this).closest('tr').find('td').each(function() {
            var textval = $(this).text();
            console.log(textval);
            sessionStorage.setItem(index, textval);
            index++;
        });
        window.location.href = "../views/edit_tax_payer.html";
    });
}

function delete_tax_payer() {
    $(document).on("click", "#deleteTaxPayer", function() {
        var tpin = $(this).attr("data-id1");
        swal({
                title: "Delete Tax Payer",
                text: "Are you sure you want to delete this tax payer?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        url: '../controller/delete_tax_payer.php',
                        method: 'POST',
                        dataType: "json",
                        data: {
                            TPIN: tpin
                        },
                        cache: false,
                        success: function(res) {
                            if (res == true) {
                                swal("Information", "Tax payer successfully deleted", "success").then(function() {
                                    load_tax_payers();
                                });
                            }
                        },
                    });
                } else {

                }
            });
    });
}
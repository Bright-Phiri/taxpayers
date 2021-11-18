$(document).ready(function() {
    load_tax_payers();
});


var api_url = sessionStorage.getItem("apiURL");

function load_tax_payers() {
    $.ajax({
        type: "GET",
        url: api_url + "/programming/challenge/webservice/Taxpayers/getAll",
        dataType: "jsonp",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "candidateid": "bphiri.aki@gmail.com",
            "apikey": "3fdb48c5-336b-47f9-87e4-ae73b8036a1c"
        },
        success: function(res) {
            data = draw_tax_payers_table(res.data);
            $("#table-body").html(data);
            $("#taxpayerstable").DataTable();
        },

    });

}

function draw_tax_payers_table(tax_payers) {
    var tax_payers_data = '';
    $.each(tax_payers, function(key, value) {
        tax_payers_data += '<tr>';
        tax_payers_data += '<td>' + value.id + '</td>';
        tax_payers_data += '<td>' + value.TPIN + '</td>';
        tax_payers_data += '<td>' + value.BusinessCertificateNumber + '</td>';
        tax_payers_data += '<td>' + value.TradingName + '</td>';
        tax_payers_data += '<td>' + value.BusinessRegistrationDate + '</td>';
        tax_payers_data += '<td>' + value.MobileNumber + '</td>';
        tax_payers_data += '<td>' + value.Email + '</td>';
        tax_payers_data += '<td>' + value.PhysicalLocation + '</td>';
        tax_payers_data += '<td>' + value.occupation + '</td>';
        tax_payers_data += "<td colspan='2' class='d-flex'><Button class='btn btn-outline-success btn-sm' id='editTaxPayer' data-id='" + value.id + "'> <i class='fa fa-pencil'></i></Button>&nbsp;&nbsp;&nbsp;<Button class='btn btn-outline-danger btn-sm mr-5' id='deleteTaxPayer' data-id1='" + value.TPIN + "'><i class='fa fa-trash'></i></Button></td>";
        tax_payers_data += '</tr>';
    });
    return tax_payers_data;
}


function delete_product() {
    $(document).on("click", "#deleteTaxPayer", function() {
        var tpin = $(this).attr("data-id1");
        swal({
                title: "Delete Product",
                text: "Are you sure you want to delete this tax payer?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        type: "POST",
                        url: api_url + "programming/challenge/webservice/Taxpayers/delete",
                        contentType: "application/json",
                        dataType: "jsonp",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "candidateid": "bphiri.aki@gmail.com",
                            "apikey": "3fdb48c5-336b-47f9-87e4-ae73b8036a1c"
                        },
                        data: JSON.stringify({ TPIN: tpin }),
                        success: function(res) {
                            if (res.ResultCode == 1) {
                                swal("Info", res.Remark, "infor").then(function() {
                                    load_tax_payers();
                                });
                            } else {
                                swal("Error", res.Remark, "error");
                            }
                        },
                        error: function(jqXHR, status, error) {
                            if (jqXHR.status == 404) {
                                swal("Error", "The requested URL was not found", "error");
                            }
                        }
                    });
                } else {

                }
            });
    });
}
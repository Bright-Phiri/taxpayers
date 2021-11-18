$(document).ready(function() {
    add_tax_payer();
});

var api_url = sessionStorage.getItem("apiURL");
var username = sessionStorage.getItem("Username");

function add_tax_payer() {
    $("#add-tax-payer-btn").on("click", function() {
        var tpin = $("#tpin").val();
        var certificate_number = $("#certificatenumber").val();
        var trading_name = $("#tradingname").val();
        var regate = $("#regate").val();
        var mobilenumber = $("#mobilenumber").val();
        var email = $("#email").val();
        var physicallocation = $("#physicallocation").val();
        if (tpin == "" || certificate_number == "" || trading_name == "" || regate == "" || mobilenumber == "" || email == "" || physicallocation == "") {
            swal("Fields Validation", "Please fill in all the fields", "warning");
        } else {
            $.ajax({
                type: "POST",
                url: api_url + "/programming/challenge/webservice/Taxpayers/add",
                dataType: "jsonp",
                contentType: "application/json",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "candidateid": "bphiri.aki@gmail.com",
                    "apikey": "3fdb48c5-336b-47f9-87e4-ae73b8036a1c"
                },
                data: JSON.stringify({
                    TPIN: tpin,
                    BusinessCertificateNumber: certificate_number,
                    TradingName: trading_name,
                    BusinessRegistrationDate: regate,
                    MobileNumber: mobilenumber,
                    Email: email,
                    PhysicalLocation: physicallocation,
                    Username: username
                }),
                success: function(res) {
                    if (res.ResultCode == 1) {
                        swal("Information", res.Remark, "info").then(function() {
                            $("form").trigger("reset");
                        });
                    } else {
                        swal("Error", res.Remark, "error");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    swal("Error", textStatus, "error");
                }
            });
        }
    });
}
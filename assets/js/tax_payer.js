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
                url: '../controller/add_tax_payer.php',
                method: 'POST',
                dataType: "json",
                data: {
                    TPIN: tpin,
                    BusinessCertificateNumber: certificate_number,
                    TradingName: trading_name,
                    BusinessRegistrationDate: regate,
                    MobileNumber: mobilenumber,
                    Email: email,
                    PhysicalLocation: physicallocation,
                    User: username
                },
                cache: false,
                success: function(res) {
                    var size = Object.keys(res).length;
                    if (size == 3) {
                        swal("Information", res.Remark, "info");
                    } else {
                        swal("Information", "Tax Payer successfully added", "info").then(function() {
                            $("form").trigger("reset");
                        });
                    }
                },
            });
        }
    });
}
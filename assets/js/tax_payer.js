$(document).ready(function() {
    add_tax_payer();
});


function add_tax_payer() {
    $("#add-tax-payer-btn").on("click", function() {
        var tpin = $("#tpin").val();
        var certificate_number = $("#certificatenumber").val();
        var trading_name = $("#tradingname").val();
        var regate = $("#regate").val();
        var mobilenumber = $("#mobilenumber").val();
        var email = $("#email").val();
        var physicallocation = $("#physicallocation").val();
        var username = $("#username").val();
        if (tpin == "" || certificate_number == "" || trading_name == "" || regate == "" || mobilenumber == "" || email == "" || physicallocation == "" || username == "") {
            swal("Fields Validation", "Please fill in all the fields", "warning");
        } else {

        }
    });
}
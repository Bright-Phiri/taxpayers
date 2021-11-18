$(document).ready(function() {
    add_tax_payer();
    update_tax_payer();
});

var api_url = sessionStorage.getItem("apiURL");
var username = sessionStorage.getItem("Username");
var num_reg = /^[0-9]+$/;
var contact_reg1 = /^0[8]{2}[0-9]{7}/;
var contact_reg2 = /^0[9]{2}[0-9]{7}/;
var names_reg_pattern = /^[a-z0-9]+$/i;
var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function add_tax_payer() {
    $("#add-tax-payer-btn").on("click", function() {
        var tpin = $("#tpin").val();
        var certificate_number = $("#certificatenumber").val();
        var trading_name = $("#tradingname").val();
        var regate = $("#regate").val();
        var mobilenumber = $("#mobilenumber").val();
        var email = $("#email").val();
        var physicallocation = $("#physicallocation").val();
        var regi = new Date(regate);
        var today = new Date();
        var date = new Date(today.toLocaleDateString("en-US"));
        if (tpin == "" || certificate_number == "" || trading_name == "" || regate == "" || mobilenumber == "" || email == "" || physicallocation == "") {
            swal("Fields Validation", "Please fill in all the fields", "warning");
        } else {
            if (!tpin.match(num_reg)) {
                swal("Fields Validation", "TPN is invalid", "warning");
            } else if (!certificate_number.match(names_reg_pattern)) {
                swal("Fields Validation", "Certificate number is invalid", "warning");
            } else if (!trading_name.match(names_reg_pattern)) {
                swal("Fields Validation", "Trading name is invalid", "warning");
            } else if (regi > date && regi.getDay() != date.getDay()) {
                swal("Fields Validation", "Date is invalid", "warning");
            } else if (!mobilenumber.match(contact_reg1) && !mobilenumber.match(contact_reg2)) {
                swal("Fields Validation", "Phone number is invalid", "warning");
            } else if (mobilenumber.length != 10) {
                swal("Fields Validation", "Phone number is invalid", "warning");
            } else if (!email.match(email_pattern)) {
                swal("Fields Validation", "Email is invalid", "warning");
            } else if (!physicallocation.match(names_reg_pattern)) {
                swal("Fields Validation", "Location is invalid", "warning");
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
                            swal("Information", "Tax Payer successfully added", "success").then(function() {
                                $("form").trigger("reset");
                            });
                        }
                    },
                });
            }
        }
    });

    $(document).on('click', '#cancel-add-user-btn', function() {
        $("form").trigger("reset");
    });
}

function update_tax_payer() {
    $("#update-tax-payer-btn").on("click", function() {
        var tpin = $("#tpin").val();
        var certificate_number = $("#certificatenumber").val();
        var trading_name = $("#tradingname").val();
        var regate = $("#regate").val();
        var mobilenumber = $("#mobilenumber").val();
        var email = $("#email").val();
        var physicallocation = $("#physicallocation").val();
        var regi = new Date(regate);
        var today = new Date();
        var date = new Date(today.toLocaleDateString("en-US"));
        if (tpin == "" || certificate_number == "" || trading_name == "" || regate == "" || mobilenumber == "" || email == "" || physicallocation == "") {
            swal("Fields Validation", "Please fill in all the fields", "warning");
        } else {
            if (!certificate_number.match(names_reg_pattern)) {
                swal("Fields Validation", "Certificate number is invalid", "warning");
            } else if (!trading_name.match(names_reg_pattern)) {
                swal("Fields Validation", "Trading name is invalid", "warning");
            } else if (regi > date && regi.getDay() != date.getDay()) {
                swal("Fields Validation", "Date is invalid", "warning");
            } else if (!mobilenumber.match(contact_reg1) && !mobilenumber.match(contact_reg2)) {
                swal("Fields Validation", "Phone number is invalid", "warning");
            } else if (mobilenumber.length != 10) {
                swal("Fields Validation", "Phone number is invalid", "warning");
            } else if (!email.match(email_pattern)) {
                swal("Fields Validation", "Email is invalid", "warning");
            } else if (!physicallocation.match(names_reg_pattern)) {
                swal("Fields Validation", "Location is invalid", "warning");
            } else {
                swal({
                        title: "Save changes?",
                        text: "Are you sure you want to update this tax payer?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            $.ajax({
                                url: '../controller/update_tax_payer.php',
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
                                        swal("Information", "Tax Payer successfully updated", "success").then(function() {
                                            $("form").trigger("reset");
                                            sessionStorage.removeItem(1);
                                            sessionStorage.removeItem(2);
                                            sessionStorage.removeItem(3);
                                            sessionStorage.removeItem(4);
                                            sessionStorage.removeItem(5);
                                            sessionStorage.removeItem(6);
                                            sessionStorage.removeItem(7);
                                            window.location.href = "../views/view_tax_payer.html";
                                        });
                                    }
                                },
                            });
                        }
                    });
            }
        }
    });
}
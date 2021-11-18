$(document).ready(function() {
    sign_in();
});

var api_url = sessionStorage.getItem("apiURL");

function sign_in() {
    $("#login-btn").on("click", function() {
        var email = $("#email").val();
        var password = $("#password").val();
        if (email == "" || password == "") {
            swal("Fields Validation", "Please fill in all the fields", "warning");
        } else {

            $.ajax({
                type: "POST",
                url: api_url + "/programming/challenge/webservice/auth/login",
                dataType: "jsonp",
                contentType: "application/json",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "candidateid": "bphiri.aki@gmail.com",
                    "apikey": "3fdb48c5-336b-47f9-87e4-ae73b8036a1c"
                },
                data: JSON.stringify({ Email: email, Password: password }),
                success: function(res) {
                    if (res.ResultCode == 1) {
                        swal("Access granted", res.Remark, "info").then(function() {
                            sessionStorage.setItem("Username", res.Username);
                            window.location.href = '../views/add_tax_payer.html';
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
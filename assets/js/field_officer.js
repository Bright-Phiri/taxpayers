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
                url: '../controller/signin.php',
                method: 'POST',
                data: {
                    Email: email,
                    Password: password
                },
                dataType: "JSON",
                cache: false,
                success: function(response) {
                    if (response.Authenticated == true) {
                        sessionStorage.setItem("Username", response.UserDetails.Username);
                        sessionStorage.setItem("Authorization", response.Token.Value);
                        swal("infor", "Login " + response.Remark, "info").then(function() {
                            window.location.href = '../views/add_tax_payer.html';
                        });
                    } else {
                        swal("Error", response.Remark, "error")
                    }
                },
            });

        }
    });
}
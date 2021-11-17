$(document).ready(function() {
    sign_in();
    create_user_account();
    view_providers();
});

var api_url = sessionStorage.getItem("apiURL");

function validate_input_fields() {
    $("#password").on("keyup blur", function() {
        var password = $(this).val();
        if (password != "") {
            if (password.length < 8) {
                $("#password_status").text("Password is too short(must be atleast 8 characters)");
                $("#createAccountBtn").attr("disabled", true);
            } else {
                if (password.length > 8) {
                    $("#password_status").text("Password is too long(must be atleast 8 characters)");
                    $("#createAccountBtn").attr("disabled", true);
                }
                if (password.length == 8) {
                    $("#password_status").text("");
                    $("#createAccountBtn").removeAttr("disabled");
                }
            }
        } else {
            $("#password_status").text("");
        }
    });

    $("#confirm-password").on("keyup blur", function() {
        var confirm_password = $(this).val();
        var password = $("#password").val();
        if (confirm_password != "" && password != "") {
            if (password != confirm_password) {
                $("#confirm_password_status").text("Those passwords didn't match, Try again.");
                $("#createAccountBtn").attr("disabled", true);
            } else {
                $("#confirm_password_status").text("");
                $("#createAccountBtn").removeAttr("disabled");
            }
        } else {
            $("#confirm_password_status").text("");
        }
    });
}

function create_user_account() {
    validate_input_fields();
    $("#createAccountBtn").click(function() {
        var username = $("#username").val();
        var emailAddress = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        if (username == "" || emailAddress == "" || password == "" || confirmPassword == "") {
            showAlert("Fields Validation", "Please enter in all fields", "warning", "Ok");
        } else {
            var pattern = /^[a-zA-Z ]+$/;
            var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!username.match(pattern)) {
                showAlert("Fields Validation", "Username is invalid", "warning", "Ok");
            } else if (!emailAddress.match(email_pattern)) {
                showAlert("Fields Validation", "Email is invalid", "warning", "Ok");
            } else {
                $.ajax({
                    type: "POST",
                    url: api_url + "/api/v1/users",
                    dataType: "JSON",
                    contentType: "application/json",
                    data: JSON.stringify({ username: username, email: emailAddress, password: password, password_confirmation: confirmPassword }),
                    success: function(res) {
                        if (res.status == "success") {
                            swal(res.status, res.message, res.status).then(function() {
                                window.location.href = '../views/login.html';
                            })
                        } else {
                            swal(res.status, res.message + ", " + res.error + " ", res.status);
                        }
                    },
                    error: function(jqXHR, status, error) {
                        if (jqXHR.status == 404) {
                            swal("Error", "The requested URL was not found", "error");
                        }
                    }
                });
            }
        }
    });
}

function sign_in() {
    $("#loginBtn").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == "" || password == "") {
            showAlert("Fields Validation", "Please enter in all fields", "warning", "Ok");
        } else {
            var api_url = sessionStorage.getItem("apiURL");
            $.ajax({
                type: "POST",
                url: api_url + "/api/v1/login",
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify({ username: username, password: password }),
                success: function(res) {
                    if (res.status == "success") {
                        sessionStorage.setItem("Authorization", res.token);
                        swal(res.status, res.message, res.status).then(function() {
                            window.location.href = '../views/dashboard.html';
                        });
                    } else {
                        swal(res.status, res.message, res.status);
                    }
                },
                error: function(jqXHR) {
                    console.log("Hahahaha" + status);
                    if (jqXHR.status == 404) {
                        swal("Error", "The requested URL was not found", "error").then(function() {
                            window.location.href = '../views/login.html';
                        })
                    }
                }
            });
        }
    });

    $("input[type='password']").keypress(function(e) {
        var code = e.which;
        if (code == 13) {
            $("#loginBtn").click();
        }
    });

    $("#cancel-add-user-btn").click(function() {
        $("form").trigger("reset");
    });
}

function view_providers() {
    var api_url = sessionStorage.getItem("apiURL");
    var authorization = sessionStorage.getItem("Authorization");
    $.ajax({
        type: "GET",
        url: api_url + "/api/v1/users",
        dataType: 'JSON',
        headers: { "Authorization": "Bearer " + authorization + "" },
        success: function(providers) {
            data = draw_providers_table(providers);
            $("#table-body").html(data);
            $("#usertable").DataTable();
        }
    });
}

function draw_providers_table(providers) {
    var provider_data = '';
    $.each(providers, function(key, value) {
        provider_data += '<tr>';
        provider_data += '<td>' + value.id + '</td>';
        provider_data += '<td>' + value.username + '</td>';
        provider_data += '<td>' + value.email + '</td>';
        provider_data += '</tr>';
    });
    return provider_data;
}

function showAlert(title, message, iconName, buttonText) {
    swal({
        title: title,
        text: message,
        icon: iconName,
        button: buttonText,
    });
}
$(document).ready(function() {
    logout();
    stati();
});

var api_url = sessionStorage.getItem("apiURL");
var authorization = sessionStorage.getItem("Authorization");

function logout() {
    $("#signout-btn").click(function() {
        sessionStorage.removeItem("Authorization");
        window.location.href = '../views/login.html';
    });
}

function stati() {
    $.ajax({
        url: api_url + "/api/v1/statistics",
        type: "GET",
        dataType: "JSON",
        headers: { "Authorization": "Bearer " + authorization + "" },
        success: function(res) {
            $("#patients").text(res.patients);
            $("#vital_signs").text(res.vital_signs);
            $("#providers").text(res.users);
        },
        error: function(jqXHR) {
            if (jqXHR.status == 404) {
                swal("Error", "The requested URL was not found", "error").then(function() {
                    window.location.href = '../views/login.html';
                });
            }
            if (jqXHR.status == 503) {
                swal("Error", "Service Unavailable", "error");
            }
        }
    });
}
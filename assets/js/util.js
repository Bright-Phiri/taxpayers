$(document).ready(function() {
    logout();
});


function logout() {
    $("#signout-btn").click(function() {
        $.ajax({
            url: '../controller/logout.php',
            method: 'POST',
            data: {
                Email: sessionStorage.getItem("Username")
            },
            dataType: "JSON",
            cache: false,
            success: function(response) {
                if (response.ResultCode == 1) {
                    sessionStorage.removeItem("Authorization");
                    sessionStorage.removeItem("Username");
                    window.location.href = '../views/login.html';
                }
            },
        });
    });
}
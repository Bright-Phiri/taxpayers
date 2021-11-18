$(document).ready(function() {
    init_tax_payer();
});


function init_tax_payer() {
    $("#tpin").val(sessionStorage.getItem(1));
    $("#certificatenumber").val(sessionStorage.getItem(2));
    $("#tradingname").val(sessionStorage.getItem(3));
    $("#regate").val(sessionStorage.getItem(4));
    $("#mobilenumber").val(sessionStorage.getItem(5));
    $("#email").val(sessionStorage.getItem(6));
    $("#physicallocation").val(sessionStorage.getItem(7));
}
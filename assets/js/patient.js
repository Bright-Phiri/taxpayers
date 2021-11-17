$(document).ready(function() {
    add_patient();
    load_patients_data();
});

var api_url = sessionStorage.getItem("apiURL");
var authorization = sessionStorage.getItem("Authorization");


function add_patient() {
    $("#add-user-btn").click(function() {
        var firstName = $("#firstname").val();
        var lastName = $("#lastname").val();
        var gender = $("#gender").val();
        var dateOfBirth = $("#birthdate").val();
        var district = $("#district").val();
        var village = $("#village").val();
        var occupation = $("#occupation").val();
        var dob = new Date(dateOfBirth);
        var today = new Date();
        var date = new Date(today.toLocaleDateString("en-US"));
        if (dateOfBirth == '' || village == '' || firstName == '' || lastName == '' || gender == '' || district == '' || occupation == '') {
            showAlert("Fields Validation", "Please enter in all fields", "warning", "Ok");
        } else {
            var pattern = /^[a-zA-Z/' ]+$/;
            if (!firstName.match(pattern)) {
                showAlert("Fields Validation", "First Name is invalid", "warning", "Ok");
            } else if (!lastName.match(pattern)) {
                showAlert("Fields Validation", "Last Name is invalid", "warning", "Ok");
            } else if (!district.match(pattern)) {
                showAlert("Fields Validation", "District is invalid", "warning", "Ok");
            } else if (!village.match(pattern)) {
                showAlert("Fields Validation", "Village is invalid", "warning", "Ok");
            } else {
                $.ajax({
                    type: "POST",
                    url: api_url + "/api/v1/patients",
                    dataType: "JSON",
                    contentType: "application/json",
                    headers: { "Authorization": "Bearer " + authorization + "" },
                    data: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        gender: gender,
                        dob: dateOfBirth,
                        district: district,
                        village: village,
                        occupation: occupation
                    }),
                    success: function(res) {
                        if (res.status == 'success') {
                            swal(res.status, res.message, res.status).then(function() {
                                $("form").trigger("reset");
                            });
                        } else {
                            swal(res.status, res.message + ", " + res.data, res.status).then(function() {});
                        }
                    },
                    error: function(jqXHR, status, error) {
                        if (jqXHR.status == 404) {
                            swal("Error", "The requested URL was not found", "error");
                        }
                    }
                })
            }
        }

    });

    $("#cancel-add-user-btn").click(function() {
        $("#patient-form").trigger("reset");
    });

    add_patient_health_record();
}

function add_patient_health_record() {
    $("#health-record-btn").click(function() {
        var weight = $("#weight").val();
        var height = $("#height").val();
        var temp_reading = $("#temp_reading").val();
        var diagnosis = $("#diagnosis").val();
        var patient_id = $("#patient-id").val();
        if (weight == '' || height == '' || temp_reading == '' || diagnosis == '') {
            showAlert("Fields Validation", "Please enter in all fields", "warning", "Ok"); //fields validation
        } else {
            $.ajax({
                type: "POST",
                url: api_url + "/api/v1/patients/" + patient_id + "/vital_signs",
                dataType: "JSON",
                contentType: "application/json",
                headers: { "Authorization": "Bearer " + authorization + "" },
                data: JSON.stringify({ weight: weight, height: height, temp_reading: temp_reading, diagnosis: diagnosis, patient_id: patient_id }),
                success: function(res) {
                    swal(res.status, res.message, res.status).then(function() {
                        $("#medicalRecord").modal("hide");
                    });
                },
                error: function(jqXHR, status, error) {
                    if (jqXHR.status == 404) {
                        swal("Error", "The requested URL was not found", "error");
                    }
                }
            });
        }
    })

    $("#health-record-cancel_btn").click(function() {
        $("form").trigger("reset");
    })


}

//fetch request all patients
function load_patients_data() {
    $.ajax({
        type: "GET",
        url: api_url + "/api/v1/patients",
        dataType: 'JSON',
        headers: { "Authorization": "Bearer " + authorization + "" },
        success: function(patients) {
            data = draw_patients_table(patients.data);
            $("#table-body").html(data);
            $("#patientstable").DataTable();
        },
        error: function(jqXHR, status, error) {
            if (jqXHR.status == 404) {
                swal("Error", "The requested URL was not found", "error");
            }
        }
    });
    select_patient_record();
    load_patient_medical_record();
}

function draw_patients_table(patients) {
    var patients_data = '';
    $.each(patients, function(key, value) {
        patients_data += '<tr>';
        patients_data += '<td>' + value.id + '</td>';
        patients_data += '<td>' + value.first_name + '</td>';
        patients_data += '<td>' + value.last_name + '</td>';
        patients_data += '<td>' + value.gender + '</td>';
        patients_data += '<td>' + value.dob + '</td>';
        patients_data += '<td>' + value.district + ' ' + value.village + '</td>';
        patients_data += '<td>' + value.occupation + '</td>';
        patients_data += "<td><Button class='btn btn-outline-primary btn-sm' id='add-medical-record' data-id='" + value.id + "'> <i class='fa fa-plus-circle'></i> </Button> <Button class='btn btn-outline-secondary btn-sm' id='view-medical-record' data-id1='" + value.id + "'><i class='fa fa-eye'></i></Button></td>";
        patients_data += '</tr>';
    });
    return patients_data;
}


function select_patient_record() {
    $(document).on("click", "#add-medical-record", function() {
        var patient_id = $(this).attr("data-id");
        $("#patient-id").val(patient_id);
        $("#medicalRecord").modal("show");
    });
}


//fetch request all patient vital signs
function load_patient_medical_record() {
    $(document).on("click", "#view-medical-record", function() {
        var patient_id = $(this).attr("data-id1");
        $("#id").val(patient_id);
        $.ajax({
            type: "GET",
            url: api_url + "/api/v1/patients/" + patient_id + "/vital_signs/" + patient_id,
            dataType: 'JSON',
            headers: { "Authorization": "Bearer " + authorization + "" },
            success: function(vitals) {
                if (vitals.status == 'error') {
                    swal("Message", vitals.message, "info");
                } else {
                    data = patient_health_record(vitals.data);
                    $("#patient_data").html(data);
                    $("#viewMedicalRecord").modal("show");
                }
            },
            error: function(jqXHR, status, error) {
                if (jqXHR.status == 404) {
                    swal("Error", "The requested URL was not found", "error");
                }
            }
        });

    });
}

function patient_health_record(vitals) {
    var health_record = "<ul class='timeline'>";
    $.each(vitals, function(key, value) {
        var diagnosis = value.diagnosis.split("|");
        var diagnosis_date = value.created_at.substr(0, 7);
        health_record += "<li> <a class='text-decoration-none'>Vital Signs</a> <a class='float-end text-decoration-none'>" + diagnosis_date + "</a>";
        health_record += "<table class='table table-bordered mt-2'> <thead class='thead-light'> <tr> <th scope='col'>Weight(Kgs)</th> <th scope='col'>Height(M)</th> <th scope='col'>Temperature Reading<span>&#8451;</span></th></tr></thead>";
        health_record += "<tbody><tr><td>" + value.weight + "</td><td>" + value.height + "</td><td>" + value.temp_reading + "</td></tr><tbody>";
        health_record += "</table> <div class='card mt-2'> <div class='card-header bg-light'> <h6>Diagnosis used</h6>  </div><div class='card-body'><ul>";
        health_record += "<li>" + diagnosis[1] + "</li>";
        health_record += "<a class='btn btn-outline-primary mt-3' href='https://www.icd10data.com/ICD10CM/Codes/" + diagnosis[0] + "' target='_blank'>View Diagnosis</a>";
        health_record += "</ul></div></div></li>";
    });
    health_record += "</ul>";
    return health_record;
}

function showAlert(title, message, iconName, buttonText) {
    swal({
        title: title,
        text: message,
        icon: iconName,
        button: buttonText,
    })
}

$(document).ready(function () {
    $('.modal').modal({
        show: false,
        dismissible: false,
        opacity: .5
    });
});
// Activate submit button
$('#add-btn').on('click', function (event) {
    event.preventDefault();
    function validateForm() {
        var isValid = true;
        $('.form-control').each(function () {
            if ($(this).val() === '') {
                isValid = false;
            }
        });
        $('.chosen-select').each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });
        return isValid;
    }
    if (validateForm() == true) {
        // Gather user inputs
        var userInput = {
            name: $('#name').val().trim(),
            photo: $('#photo').val().trim(),
            scores: [
                $('#q1').val(),
                $('#q2').val(),
                $('#q3').val(),
                $('#q4').val(),
                $('#q5').val(),
                $('#q6').val(),
                $('#q7').val(),
                $('#q8').val(),
                $('#q9').val(),
                $('#q10').val(),
            ]
        };

        console.log('userInput = ' + JSON.stringify(userInput));
        $.post('/api/friends', userInput)
            .done(function (data) {
                console.log('response = ' + JSON.stringify(data));
                // Set the name and image values of friend match
                $('#userMatch').html(data.matchName);
                $("#userMatchImage").attr("src", data.matchImage);
                // Pop open the modal dialog
                $('#modal').modal('show');

                $('#name').val("");
                $('#photo').val("");
                $('#q1').val("");
                $('#q2').val("");
                $('#q3').val("");
                $('#q4').val("");
                $('#q5').val("");
                $('#q6').val("");
                $('#q7').val("");
                $('#q8').val("");
                $('#q9').val("");
                $('#q10').val("");

            });
    }
    else {
        $('#errorMsg').text("PLEASE FILL ALL FIELDS BEFORE SUBMITTING");
    }
});

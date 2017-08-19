/**
 * Created by mephisto on 6/24/17.
 */

$(document).ready(function () {
    $('#contact-form').submit(function(event){
        event.preventDefault();
        var fieldsDefined = true;
        $('#form-error').html('');
        $('#form-submission').html('');
        $('input').each(function(){

            if($(this).val() ===''){
                $('#form-error').html('*All input fields are required.');
                fieldsDefined = false;
            }
        });

        if(fieldsDefined){
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var message = $('#message').val();

            console.log(name, email, phone, message);

            $.ajax({
                method: "POST",
                url: "http://www.wchadmckee.com:4001/dadcontact",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                }
            });

            $('#form-submission').html('Your message has been sent.')
        }

    });
});
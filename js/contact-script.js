/**
 * Created by mephisto on 6/24/17.
 */

$(document).ready(function () {
    $('#contact-form').submit(function(event){
        event.preventDefault();
        console.log('form submitted');
        $('input').each(function(){
            // var currentInputTagClass = $(this).attr('class');
            // console.log(currentInputTagClass);
            // var errorDivClassName = '.' + currentInputTagClass + '-error';
            // console.log(errorDivClassName);
            if($(this).val() ===''){
                $('#form-error').html('*All input fields are required.')
            }else{
                var name = $('#name').val();
                var email = $('#email').val();
                var phone = $('#phone').val();
                var message = $('#message').val();

                console.log(name, email, phone, message)
            }
        });


    });
});
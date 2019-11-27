function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
};

function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
};

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
};

function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
};

function loginAjax(){
    objEvent = {
        correo: $('#email1').val(),
        contrasenia: $('#password1').val()
    };
    $.ajax({
        type: 'POST',
        url: '/users/login',
        data: objEvent,
        success: function(){
            $('#loginModal').modal('toggle');
            $('#erased').toggleClass('hide-sign');
            $('#Bienvenido').toggleClass('hide-sign');
            $('#calendar').toggleClass('hide-sign');
            $('#calendar2').toggleClass('hide-sign');
            $('#calendar').fullCalendar('refetchEvents');
            $('#calendar2').fullCalendar('refetchEvents');
            $('##bienvenidoTXT').val('Bienvenido');
        },
        error: function(){
            shakeModal();
        },
    })
};

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
};

$('#submitRegister').click(function(){
    objEvent = {
        correo: $('#email2').val(),
        contrasenia: $('#password2').val(),
        username: $('#username').val(),
        nombre: $('#name1').val(),
        passwordMatch: $('#password_confirmation').val()
    };
    $.ajax({
        type: 'POST',
        url: '/users/register',
        data: objEvent,
        success: function(){
            $('#loginModal').modal('toggle');
            $('#loginModal').modal('show'); 
            alert('Registrado correctamente')
        },
        error: function(){
            shakeModal();
        },
    })
});

function cerrarSesion(){
    $('#erased').toggleClass('hide-sign');
    $('#Bienvenido').toggleClass('hide-sign');
    $('#calendar').toggleClass('hide-sign');
    $('#calendar2').toggleClass('hide-sign');
    $('#calendar').fullCalendar('refetchEvents');
    $('#calendar2').fullCalendar('refetchEvents');
};
   
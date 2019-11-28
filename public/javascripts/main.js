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
            location.reload();
            
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

function logOut(){
    $.ajax({
        type: 'POST',
        url: '/users/logout',
        success: function(){
            location.reload();
        },
        error: function(){
            alert('Hubo un error al cerrar sesion');
        },
    })
}
window.onload = function() {
    $("#week").prop("checked", true);
    $("#all").prop("selected", true);
    var element = document.querySelector('.mybtn');
    var tags = document.getElementsByTagName('i');
    var bars= tags[1];
    var close= tags[2];
    var valor = document.getElementsByName('radio1');
    var element1 = document.getElementById('visualizacion');
    var element2 = document.getElementById('algo');

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4',
        dateFormat: 'YY/MM/DD',
    });

    $('.clockpicker').clockpicker();

    element.addEventListener('click', function(){
        document.getElementById('wrapper').classList.toggle('toggled');
        bars.classList.toggle('hide-sidebar');
        close.classList.toggle('hide-sidebar');
    });

    element1.addEventListener('click',  function (){
        for(i=0;i<valor.length;i++)
            if(valor[i].checked){
              var el= valor[i].value;
              $('#calendarAdministrador').fullCalendar('changeView', el);
              $('#calendarNoLogin').fullCalendar('changeView', el);
              $('#calendarCatedratico').fullCalendar('changeView', el);
            }
    });

    element2.addEventListener('click',function(){
        var date2 = $('#datepicker').datepicker().val();
        $('#calendarAdministrador').fullCalendar('gotoDate', date2);
        $('#calendarNoLogin').fullCalendar('gotoDate', date2);
        $('#calendarCatedratico').fullCalendar('gotoDate', date2);
    });

    //calendar config
    var NuevoEvento;

    function RecolectarDatosGUI(){
        var color;
        if($('#status').val()== false){
            color='purple';
        }else{
            color='green';
        }
        NuevoEvento = {
            id:$('#txtId').val(),
            title:$('#txtMateria option:selected').text() +"-"+ $('#txtLaboratorio option:selected').text(),
            materia:$('#txtMateria').val(),
            start:$('#txtFecha').val() + " " + $('#txtHora').val(),
            laboratorio: $('#txtLaboratorio').val(),
            status: $('#status').val(),
            fin:$('#txtFin').val(),
            color:color,
            code_usuario:$('#pickCode').val(),
        };
    };

    function EnviarInformacion(objEvento){
        $.ajax({
        type: 'POST',
        url: '/reserva/',
        data: objEvento,
        success : function(msg){
            if(msg){
            $('#ModalEventos').modal('toggle');
            $('#calendarAdministrador').fullCalendar('refetchEvents');
            $('#calendarCatedratico').fullCalendar('refetchEvents');
            
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            if (jqXHR.status === 0) {
            
                console.log('Not connect: Verify Network.');
                alert('Not connect: Verify Network.');
            
            } else if (jqXHR.status == 404) {
            
                alert('Requested page not found [404]');
            
            } else if (jqXHR.status == 500) {
            
                alert('Internal Server Error [500].');
            
            } else if (textStatus === 'parsererror') {
            
                alert('Requested JSON parse failed.');
            
            } else if (textStatus === 'timeout') {
            
                alert('Time out error.');
            
            } else if (textStatus === 'abort') {
            
                alert('Ajax request aborted.');
            
            } else {
    
                alert('Uncaught Error: ' + jqXHR.responseText);
            
            }
            }
        }
        )
    };

    function EliminarInformacion(objEvento){
        idObjeto = objEvento.id
        $.ajax({
        type: 'DELETE',
        url: '/reserva/'+ idObjeto,
        success : function(msg){
            if(msg){
            $('#ModalEventos').modal('toggle');
            $('#calendarAdministrador').fullCalendar('refetchEvents');
            $('#calendarCatedratico').fullCalendar('refetchEvents');
            alert('Eliminado correctamente');
            }
        }
        })
    };

    function ModificarInformacion(objEvento,modal){
        idObjeto = objEvento.id;
        $.ajax({
        type: 'PUT',
        url: '/reserva/'+ idObjeto,
        data: objEvento,
        success : function(msg){
            if(msg){
            if(!modal){
                $('#ModalEventos').modal('toggle');
            }
            $('#calendarAdministrador').fullCalendar('refetchEvents');
            $('#calendarCatedratico').fullCalendar('refetchEvents');
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            if (jqXHR.status === 0) {
            
                console.log('Not connect: Verify Network.');
                alert('Not connect: Verify Network.');
            
            } else if (jqXHR.status == 404) {
            
                alert('Requested page not found [404]');
            
            } else if (jqXHR.status == 500) {
            
                alert('Internal Server Error [500].');
            
            } else if (textStatus === 'parsererror') {
            
                alert('Requested JSON parse failed.');
            
            } else if (textStatus === 'timeout') {
            
                alert('Time out error.');
            
            } else if (textStatus === 'abort') {
            
                alert('Ajax request aborted.');
            
            } else {
    
                alert('Uncaught Error: ' + jqXHR.responseText);
            
            }
            }
        }
        )
    };

    $('#btnAgregar').click(function(){
        RecolectarDatosGUI();
        EnviarInformacion(NuevoEvento);
    });

    $('#btnEliminar').click(function(){
        RecolectarDatosGUI();
        EliminarInformacion(NuevoEvento);
    });

    $('#btnModificar').click(function(){
        RecolectarDatosGUI();
        ModificarInformacion(NuevoEvento);
    });

    $('#calendarAdministrador').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right:''
    },

    selectable: true,
    selectHelper: true,
    navLinks: true,
    allDaySlot:false,
    
    defaultView:'agendaWeek',
    minTime: '07:00:00',
    maxTime: '21:00:00',
    events:'/reserva',
    editable: true,
    eventTextColor:'white',
    
    dayClick: function(date, jsEvent, view) {
        $('#btnAgregar').prop('disabled',false);
        $('#btnModificar').prop('disabled',true);
        $('#btnEliminar').prop('disabled',true);

        FechaHora= date.format().split('T')
        $('#txtFecha').val(FechaHora[0]);
        $('#txtHora').val(FechaHora[1]);
        $('#txtLaboratorio').val(1);
        $('#txtMateria').val(1);
        $('#txtFin').val('');
        $('#ModalEventos').modal();
    },
    
    eventClick: function(calEvent, jsEvent, view, resourceObj) {
        $('#btnAgregar').prop('disabled',true);
        $('#btnModificar').prop('disabled',false);
        $('#btnEliminar').prop('disabled',false);

        $('#tituloEvento').html(calEvent.title);

        $('#txtId').val(calEvent.id);
        $('#txtMateria').val(calEvent.materia);
        $('#txtLaboratorio').val(calEvent.laboratorio);
        $('#pickColor').val(calEvent.color);

        FechaHora = calEvent.start._i.split("T");

        $('#txtFecha').val(FechaHora[0]);
        $('#txtHora').val(FechaHora[1]);

        $('#txtFin').val(calEvent.fin);
        $('#ModalEventos').modal();
    },

    eventDrop: function(calEvent){
        $('#txtId').val(calEvent.id);
        $('#txtMateria').val(calEvent.materia);
        $('#txtLaboratorio').val(calEvent.laboratorio);

        FechaHora = calEvent.start.format().split("T");
        $('#txtFecha').val(FechaHora[0]);
        $('#txtHora').val(FechaHora[1]);

        $('#txtFin').val(calEvent.fin);

        RecolectarDatosGUI();
        ModificarInformacion(NuevoEvento,true);
    },
    events:'/reserva',
    eventRender: function eventRender( event, element, view ) {
        return ['all', event.laboratorio].indexOf($('#selectLabs').val()) >= 0
        
    }
    });

    $('#calendarCatedratico').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right:''
        },
    
        selectable: true,
        selectHelper: true,
        navLinks: true,
        allDaySlot:false,
        
        defaultView:'agendaWeek',
        minTime: '07:00:00',
        maxTime: '21:00:00',
        events:'/reserva',
        editable: true,
        eventTextColor:'white',
        
        dayClick: function(date, jsEvent, view) {
            $('#btnAgregar').prop('disabled',false);
            $('#btnModificar').prop('disabled',true);
            $('#btnEliminar').prop('disabled',true);
    
            FechaHora= date.format().split('T')
            $('#txtFecha').val(FechaHora[0]);
            $('#txtHora').val(FechaHora[1]);
            $('#txtLaboratorio').val(1);
            $('#txtMateria').val(1);
            $('#txtFin').val('');
            $('#ModalEventos').modal();
        },
        
        eventClick: function(calEvent, jsEvent, view, resourceObj) {
            $('#btnAgregar').prop('disabled',true);
            $('#btnModificar').prop('disabled',false);
            $('#btnEliminar').prop('disabled',true);
    
            $('#tituloEvento').html(calEvent.title);
    
            $('#txtId').val(calEvent.id);
            $('#txtMateria').val(calEvent.materia);
            $('#txtLaboratorio').val(calEvent.laboratorio);
            $('#pickColor').val(calEvent.color);
    
            FechaHora = calEvent.start._i.split("T");
    
            $('#txtFecha').val(FechaHora[0]);
            $('#txtHora').val(FechaHora[1]);
    
            $('#txtFin').val(calEvent.fin);
            $('#ModalEventos').modal();
        },
    
        eventDrop: function(calEvent){
            $('#txtId').val(calEvent.id);
            $('#txtMateria').val(calEvent.materia);
            $('#txtLaboratorio').val(calEvent.laboratorio);
    
            FechaHora = calEvent.start.format().split("T");
            $('#txtFecha').val(FechaHora[0]);
            $('#txtHora').val(FechaHora[1]);
    
            $('#txtFin').val(calEvent.fin);
    
            RecolectarDatosGUI();
            ModificarInformacion(NuevoEvento,true);
        },
        events:'/reserva',
        eventRender: function eventRender( event, element, view ) {
            return ['all', event.laboratorio].indexOf($('#selectLabs').val()) >= 0
            
        }
    });

    $('#calendarNoLogin').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right:''
        },

        selectable: true,
        selectHelper: true,
        navLinks: true,
        allDaySlot:false,
        
        defaultView:'agendaWeek',
        minTime: '07:00:00',
        maxTime: '21:00:00',
        events:'/reserva',
        eventTextColor:'white',

        eventClick: function(calEvent, jsEvent, view, resourceObj) {
            $('#btnAgregar').prop('disabled',true);
            $('#btnModificar').prop('disabled',true);
            $('#btnEliminar').prop('disabled',true);

            $('#tituloEvento').html(calEvent.title);

            $('#txtId').val(calEvent.id);
            $('#txtMateria').val(calEvent.materia);
            $('#txtLaboratorio').val(calEvent.laboratorio);
            $('#pickColor').val(calEvent.color);

            FechaHora = calEvent.start._i.split("T");

            $('#txtFecha').val(FechaHora[0]);
            $('#txtHora').val(FechaHora[1]);

            $('#txtFin').val(calEvent.fin);
            $('#ModalEventos').modal();
        },
        events:'/reserva',
        eventRender: function eventRender( event, element, view ) {
            return ['all', event.laboratorio].indexOf($('#selectLabs').val()) >= 0
            
        },
    });

    $('#selectLabs').on('change',function(){
        $('#calendarAdministrador').fullCalendar('rerenderEvents');
        $('#calendarNoLogin').fullCalendar('rerenderEvents');
        $('#calendarCatedratico').fullCalendar('rerenderEvents');
    });

    //other
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
};
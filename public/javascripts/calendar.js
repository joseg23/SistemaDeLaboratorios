$(document).ready(function() {
    var valor = document.getElementsByName('radio1');
    var element = document.getElementById('visualizacion');
    var element2 = document.getElementById('algo');

    

    element.addEventListener('click',  function (){
        for(i=0;i<valor.length;i++)
            if(valor[i].checked) var el= valor[i].value;
            $('#calendar').fullCalendar('changeView', el);

    });
    
    element2.addEventListener('click',function(){
      var date2 = $("#datepicker").datepicker().val();
      $('#calendar').fullCalendar('gotoDate', date2);
    });

    var NuevoEvento;

    $('#btnAgregar').click(function(){
        RecolectarDatosGUI();
        EnviarInformacion(NuevoEvento);
    });

    function RecolectarDatosGUI(){
        NuevoEvento = {
            title:$('#txtMateria option:selected').text() +"-"+ $('#txtLaboratorio option:selected').text(),
            materia:$('#txtMateria').val(),
            start:$('#txtFecha').val() + " " + $('#txtHora').val(),
            laboratorio: $('#txtLaboratorio').val(),
            status: false,
            fin:$('#txtFin').val()
        };
    };

    function EnviarInformacion(objEvento){
      $.ajax({
        type: 'POST',
        url: '/reserva',
        data:objEvento,
        success : function(msg){
          if(msg){
            $('#ModalEventos').modal('toggle');
            $('#calendar').fullCalendar('refetchEvents');
            
          }
        },
        error : function(){
          alert('hay un error...')
        }
      })
    }


    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right:''
      },

      selectable: true,
      selectHelper: true,
      navLinks: true,
      editable: true,
      allDaySlot:false,
      
      defaultView:'agendaWeek',
      minTime: '07:00:00',
      maxTime: '21:00:00',
      
      dayClick: function(date, jsEvent, view) {
        
        $('#txtFecha').val(date.format());

        $('#ModalEventos').modal();
      },

      events:'/reserva',
      
      eventClick: function(calEvent, jsEvent, view, resourceObj) {
        $('#tituloEvento').html(calEvent.title);

        $('#txtId').val(calEvent.id);
        $('#txtDescripcion').val(calEvent.descripcion);
        $('#txtMateria').val(calEvent.materia);
        $('#txtLaboratorio').val(calEvent.laboratorio);

        FechaHora = calEvent.start._i.split("T");
        $('#txtFecha').val(FechaHora[0]);
        $('#txtHora').val(FechaHora[1]);

        $('#ModalEventos').modal();
      }
    });
  });
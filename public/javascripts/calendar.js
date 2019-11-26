$(document).ready(function() {
  var NuevoEvento;

  function RecolectarDatosGUI(){
    NuevoEvento = {
        id:$('#txtId').val(),
        title:$('#txtMateria option:selected').text() +"-"+ $('#txtLaboratorio option:selected').text(),
        materia:$('#txtMateria').val(),
        start:$('#txtFecha').val() + " " + $('#txtHora').val(),
        laboratorio: $('#txtLaboratorio').val(),
        status: false,
        fin:$('#txtFin').val(),
        color:'purple'
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
          $('#calendar').fullCalendar('refetchEvents');
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
          $('#calendar').fullCalendar('refetchEvents');
          alert('Eliminado correctamente');
        }
      }
    })
  }

  function ModificarInformacion(objEvento,modal){
    idObjeto = objEvento.id;
    console.log(objEvento);
    console.log(idObjeto);
    $.ajax({
      type: 'PUT',
      url: '/reserva/'+ idObjeto,
      data: objEvento,
      success : function(msg){
        if(msg){
          if(!modal){
            $('#ModalEventos').modal('toggle');
          }
          $('#calendar').fullCalendar('refetchEvents');
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

  $('#calendar').fullCalendar({
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
    }
  });
});
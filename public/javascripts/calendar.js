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
        fin:$('#txtFin').val()
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

  function ModificarInformacion(objEvento){
    idObjeto = objEvento.id
    $.ajax({
      type: 'PUT',
      url: '/reserva/'+ idObjeto,
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
    editable: true,
    allDaySlot:false,
    
    defaultView:'agendaWeek',
    minTime: '07:00:00',
    maxTime: '21:00:00',
    
    dayClick: function(date, jsEvent, view) {
      
      FechaHora= date.format().split('T')
      $('#txtFecha').val(FechaHora[0]);
      $('#txtHora').val(FechaHora[1]);
      $('#txtLaboratorio').val(1);
      $('#txtMateria').val(1);
      $('#txtFin').val('');
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

      $('#txtFin').val(calEvent.fin);
      $('#ModalEventos').modal();
    }
  });
});
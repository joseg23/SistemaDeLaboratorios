$(document).ready(function() {
    var valor = document.getElementsByName('radio1');
    var element = document.getElementById('visualizacion');
    var element2 = document.getElementById('algo');

    

    element.addEventListener('click',  function (){
        for(i=0;i<valor.length;i++)
            if(valor[i].checked) var el= valor[i].value;
            $('#calendar').fullCalendar('changeView', el);

    });
    
    element2.addEventListener('keyup',function(){
      var date2 = $("#datepicker").datepicker().val();
      $('#calendar').fullCalendar('gotoDate', date2);
    
    })

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

      events:'',
      
      eventClick: function(calEvent, jsEvent, view, resourceObj) {
          $('#tituloEvento').html(calEvent.title);
          $('#descripcionEvento').html(calEvent.descripcion);
          $('#exampleModal').modal();
      }
    });
  });
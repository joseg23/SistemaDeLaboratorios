$(document).ready(function() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right:'month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      
      eventClick: function(calEvent, jsEvent, view, resourceObj) {
          swal({
            title: calEvent.title,
            text: "Start From : "+moment(calEvent.start).format("MMMM Do YYYY, h:mm a"),
            icon: "success",
          });
      }
    });
  });
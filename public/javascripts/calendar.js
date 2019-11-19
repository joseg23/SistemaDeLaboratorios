$(document).ready(function() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2018-03-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
           events: [
        {
          title: 'All Day Event',
          start: '2018-03-01',
           backgroundColor:'red'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10',
          backgroundColor:'green'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      ],
      eventClick: function(calEvent, jsEvent, view, resourceObj) {
          swal({
            title: calEvent.title,
            text: "Start From : "+moment(calEvent.start).format("MMMM Do YYYY, h:mm a"),
            icon: "success",
          });
      }
    });
    $(".fc-right .fc-button-group").append(
          '<div class="input-group datetimepicker"><input type="text" class="form-control fc-datepicker" placeholder="YYYY-MM-DD" style="padding: 0;width: 0;border: none;margin: 0;"></div>');
        $(".fc-datepicker").datepicker({
          dateFormat: 'yy-mm-dd',
          showOn: "button",
          buttonText: '<span class="input-group-addon"><i class="fas fa-calendar-alt"></i></span>'
        });
  });
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
              $('#calendar').fullCalendar('changeView', el);
              $('#calendar2').fullCalendar('changeView', el);
            }
    });

    element2.addEventListener('click',function(){
        var date2 = $('#datepicker').datepicker().val();
        $('#calendar').fullCalendar('gotoDate', date2);
        $('#calendar2').fullCalendar('changeView', el);
    });

};
window.onload = function() {
    $("#week").prop("checked", true);
    var element = document.querySelector('.mybtn');
    var tags = document.getElementsByTagName('i');
    var bars= tags[1];
    var close= tags[2];
    var valor = document.getElementsByName('radio1');
    var element1 = document.getElementById('visualizacion');
    var element2 = document.getElementById('algo');

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });


    $('.clockpicker').clockpicker();

    element.addEventListener('click', function(){
        document.getElementById('wrapper').classList.toggle('toggled');
        bars.classList.toggle('hide-sidebar');
        close.classList.toggle('hide-sidebar');
    });

    //Funcion verificar usuario

    function SendUser(GetUser){
        $.ajax({
          type: 'GET',
          url: '/users',
          data:GetUser,
          success : function(msg){
            if(msg){
              $('#loginModal').modal('toggle');
              alert('inicio de sesion')
            }
          },
          error : function(){
            alert('hay un error...')
          }
        })
    };

    element1.addEventListener('click',  function (){
        for(i=0;i<valor.length;i++)
            if(valor[i].checked){
              var el= valor[i].value;
              $('#calendar').fullCalendar('changeView', el);
            }
    });

    element2.addEventListener('click',function(){
        var date2 = $("#datepicker").datepicker().val();
        $('#calendar').fullCalendar('gotoDate', date2);
      });  
};
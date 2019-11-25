window.onload = function() {
    var element = document.querySelector('.mybtn');
    var tags = document.getElementsByTagName('i');
    var bars= tags[1];
    var close= tags[2];

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });

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
      }
};


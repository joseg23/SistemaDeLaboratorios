window.onload = function() {
    var element = document.querySelector('.mybtn');
    var tags = document.getElementsByTagName('i');
    var bars= tags[1];
    var close= tags[2];

    element.addEventListener('click', function(){
        document.getElementById('wrapper').classList.toggle('toggled');
        bars.classList.toggle('hide-sidebar');
        close.classList.toggle('hide-sidebar');
    })

};


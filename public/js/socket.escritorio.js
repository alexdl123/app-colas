
var sokect = io();

var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var small = $('small');

console.log(escritorio);

$('h1').text('Escritorio '+ escritorio);

$('button').click(function(){

    sokect.emit('atenderTicket',{escritorio: escritorio},function(resp){
        console.log(resp);
        if(resp === 'No hay tickets'){
            alert('No hay mas tikets');
            return;
        }
        small.text(resp.numero);
    })
})


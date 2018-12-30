

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect',function(){

    console.log("Conectado al servidor");

});

socket.on('disconnect',function(){

    console.log("Perdimos la conexion con el servidor");

})

socket.on('estadoActual',function(data){

    label.text(data.ultimo);
    
})

$('button').click(function(){

    console.log("Hola");
    socket.emit('siguienteTicket',null,function(siguiente){
        console.log(siguiente);
        label.text(siguiente);
    });

});
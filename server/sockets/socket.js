const { io } = require('../server');

const {TicketControl} = require('../classes/ticker-control');

var ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data,callback) => {

        //console.log("¿Cual es el siguiente Ticket?");
        let siguiente = ticketControl.siguienteTicket();

        callback(siguiente);

    });

    client.emit('estadoActual',{
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket',(data,callback) => {

        if(data == null || !data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        });
    })

});
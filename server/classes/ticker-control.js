
const fs  = require('fs');

class Ticket {

    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }

}


class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        var data = require("../data/data.json");

        if( this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }
        

    }

    siguienteTicket(){

        this.ultimo++;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.guardarInArchivo();
        return `Ticker ${this.ultimo}`;

    }

    getUltimoTicket(){
        return `Ticker ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    reiniciarConteo(){
        
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.guardarInArchivo();
        console.log("Se ha reiniciado el Conteo del sistema");

    }

    guardarInArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json',jsonDataString);
        
    }

    atenderTicket(escritorio){

        if(this.tickets.length === 0){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket,escritorio);
        this.ultimos4.unshift(atenderTicket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); // para eliminar el ultimo
        }

        console.log("ultimos 4 ",this.ultimos4);

        this.guardarInArchivo();

        return atenderTicket;

    }

}

module.exports = {
    TicketControl
}
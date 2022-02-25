const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('BTS'));
bands.addBand(new Band('Stray Kids'));
bands.addBand(new Band('Seventeen'));
bands.addBand(new Band('Got7'));

//Mensajes de Sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });


    //escuchar evento del cliente
    client.on('mensaje', (payload) => {
        console.log('mensaje: ',payload);
        //emitir evento a todos los clientes conectados
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

    client.on('emitir-mensaje', ( payload ) => {
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); //esto emite a todos
        //client.broadcast en vez de io para emitir a todos menos al que lo emitio
        client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload) =>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) =>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) =>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    

});
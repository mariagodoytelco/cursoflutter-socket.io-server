const {io} = require('../index');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });


    //escuchar evento del cliente
    client.on('mensaje', (payload) => {
        console.log('mensaje: ',payload);
        //emitir evento a todos los clientes conectados
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

});
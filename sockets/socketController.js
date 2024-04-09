const socketController = (socket) => {
    console.log("Cliente conectado", socket.handshake.headers['sec-ch-ua']);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
    });

    socket.on("mensaje-to-server", (payload, callback) => {
        console.log('💻 -> ', payload);
        const id= 1234;
        callback(id)

        socket.broadcast.emit('res-ser', payload);
    });
}

module.exports={
    socketController
}
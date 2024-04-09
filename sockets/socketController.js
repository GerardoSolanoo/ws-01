const socketController = (socket) => {
  console.log("Cliente conectado", socket.handshake.headers["sec-ch-ua"]);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("enviar-mensaje", (payload, callback) => {
    console.log("💻 -> ", payload);
    const id = 1234;
    callback(id);

    const mensaje = {
        cliente: socket.id,
        fecha: payload.fecha,
        hora: payload.hora,
        descripcion: payload.descripcion,
    };

    socket.emit("res-ser", mensaje);
  });

  socket.on("eliminar-mensaje", (mensajeId) => {
    socket.broadcast.emit("mensaje-eliminado", mensajeId);
  });
};

module.exports = {
  socketController,
};

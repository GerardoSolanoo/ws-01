const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");
const tablaMensajes = document.querySelector("#tablaMensajes tbody");

const socketClient = io();

socketClient.on("connect", () => {
  console.log("Conectado 👌");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socketClient.on("disconnect", () => {
  console.log("Desconectado 💀");
  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

socketClient.on("res-ser", (mensaje) => {
  console.log("Mensaje recibido desde el servidor:", mensaje);

  const row = tablaMensajes.insertRow(0);
  const clienteCell = row.insertCell(0);
  const fechaHoraCell = row.insertCell(1);
  const descripcionCell = row.insertCell(2);
  const accionesCell = row.insertCell(3);

  clienteCell.textContent = mensaje.cliente;
  fechaHoraCell.textContent = mensaje.fecha + " " + mensaje.hora;
  descripcionCell.textContent = mensaje.descripcion;

  const eliminarButton = document.createElement("button");
  eliminarButton.textContent = "Eliminar";
  eliminarButton.classList.add("btn", "btn-danger");
  eliminarButton.addEventListener("click", () => {
    socketClient.emit("eliminar-mensaje", mensaje.id);

    row.remove();
  });
  accionesCell.appendChild(eliminarButton);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  console.log(mensaje);

  const payload = {
    descripcion: mensaje,
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
  };

  socketClient.emit("enviar-mensaje", payload, (id) => {
    console.log("🥕 Callback desde el server", id);
  });
});

console.log("Hola mundo");

const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOfline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


const socketClient = io();

socketClient.on("connect", () => {
  console.log("Conectado 👌");
  lblOfline.style.display = 'none';
  lblOnline.style.display = '';
});

socketClient.on("disconnect", () => {
  console.log("Desconectado 💀");
  lblOfline.style.display = '';
  lblOnline.style.display = 'none';
});

socketClient.on('res-ser', (resp) => {
  console.log('🟡 Servidor respondio',resp);
});

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;
  console.log(mensaje);

  const payload = {
    mensaje,
    id: '123ABC',
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  };

  socketClient.emit('enviar-mensaje', payload, (id) => {
    console.log('🥕 Callback desde el server', id);
  });
});
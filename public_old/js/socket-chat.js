var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has("room")) {
    window.location = "index.html";
    throw new Error("The name and room are required");
}

var user = {
    name: params.get("name"),
    room: params.get("room")
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit("inChat", user, function(resp) {
        console.log("Users connected", resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(message) {
    console.log('Servidor:', message);
});

socket.on('listPersons', function (persons) {
    console.log(persons);
});

// Mensajes privados.
socket.on("privateMessage", (message) => {
    console.log("Mensaje privado:", message);
});
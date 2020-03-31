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

socket.on("connect", function() {
    console.log("Conectado al servidor");

    socket.emit("inChat", user, function(resp) {
        renderUsers(resp);
    });
});

// escuchar
socket.on("disconnect", function() {
    console.log("Perdimos conexión con el servidor");
});

// Escuchar información
socket.on("createMessage", function(message) {
    renderMessages(message, false);
    scrollBottom();
});

socket.on("listPersons", function (persons) {
    renderUsers(resp);
});

// Mensajes privados.
socket.on("privateMessage", (message) => {
    console.log("Mensaje privado:", message);
});
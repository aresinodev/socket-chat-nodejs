const { io } = require('../server');
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on('connection', (client) => {
    client.on("inChat", (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: "The name and room are required"
            });
        }

        client.join(data.room); // Añadimos al usuario conectado a la sala.

        let persons = users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit("listPersons", users.getPersonByRoom(data.room));

        callback(users.getPersonByRoom(data.room));
    });

    // Evento que está escuchando cuando un usuario está mandando un mensaje al resto de usuarios del chat.
    client.on("createMessage", (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit("createMessage", message);
    });

    client.on("disconnect", () => {
        let personDeleted = users.personDeleted(client.id);

        client.broadcast.to(personDeleted.room).emit("createMessage", createMessage("Administrator", `${ personDeleted.name } left the chat.`));
        client.broadcast.to.name(personDeleted.room).emit("listPersons", users.getPersonByRoom(personDeleted.room));
    });

    client.on("privateMessage", (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.from).emit("privateMessage", createMessage(person.name, data.message));
    });
});
class Users {
    constructor() {
        this.persons = [];
    }

    addPerson(id, name, room) {
        let person = { id, name, room };

        this.persons.push(person);

        return this.persons;
    }

    getPerson(id) {
        let person = this.persons.filter(item => item.id === id)[0];

        return person;
    }

    getPersons() {
        return this.persons;
    }

    getPersonByRoom(room) {
        let personsInRoom = this.persons.filter(person => person.room === room);
        return personsInRoom;
    }

    personDeleted(id) {
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(item => item.id !== id);

        return deletedPerson;
    }
}

module.exports = {
    Users
};
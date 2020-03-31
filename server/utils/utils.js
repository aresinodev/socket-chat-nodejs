const createMessage = (userName, message) => {
    return {
        name: userName,
        message,
        date: new Date().getTime()
    }
};

module.exports = {
    createMessage
};
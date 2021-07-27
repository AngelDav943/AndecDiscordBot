module.exports = {
    description:"👍",
    async execute(message, args) {
        message.react("👍");
        message.react("👎");
    }
}
const config = require("../config.json");

module.exports = {
    description:"Gives you the current version of the bot",
    async execute(message, args) {
        message.reply(String(config["version"]))
    }
}
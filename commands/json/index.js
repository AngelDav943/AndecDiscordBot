var fs = require('fs');

module.exports = {
    type:"datastore test",
    description:"test command index ",
    hidden:true,
    async execute(message, args, discord) {
        message.channel.send("This the test.json command index.")
    }
}
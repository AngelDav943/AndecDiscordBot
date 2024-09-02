const ns = require("ms");

module.exports = {
    perms:"botcreator",
    description:"Only people with the permission of",
    async execute(message, args, Discord, client) {
        const channelString = args[1]
        
        if (channelString == undefined) return;

        let messageString = args.splice(2).join(" ")

        client.channels.fetch(channelString)
            .then(channel => {
                channel.send(messageString)
            })
    }
}
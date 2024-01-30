const config = require("../config.json");

module.exports = {
    description: "Help menu",
    async execute(message, args, discord) {
        var MessageEmbed = new discord.MessageEmbed()
            .setTitle('***Help menu***')
            .setTimestamp()
            .setDescription(`Hello, im AndecTestBot. ***(Created by AngelDav943)*** \n You can see the commands with ;cmds. \n\n`)
            .addFields(
                { "name": "Links", "value": "Twitter: https://twitter.com/AndecStudios \n Discord group: https://discord.com/invite/k5K82bz" },
                {"name" : "Bot's running version", "value": String(config["version"]) }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif")

        message.channel.send(MessageEmbed)
    }
}
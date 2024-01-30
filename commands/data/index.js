var fs = require('fs');
var commands = fs.readdirSync(__dirname);


module.exports = {
    type: "data",
    description: "data stuff",

    async execute(message, args, discord) {
        console.log(commands)
        let embedDescription = ``

        for (var i = 0; i < commands.length; i++) {
            let cmddescr = ""
            cmddescr = require(__dirname + "/" + commands[i]).description

            if (require(__dirname + "/" + commands[i]).type == "json test") {
                commands[i] = commands[i].split(".js").join("")
                embedDescription = embedDescription + ` **;data.${commands[i]}** | ${cmddescr} \n\n `
            }
        }

        var MessageEmbed = new discord.MessageEmbed()
            .setTitle('***;data commands***')
            .setTimestamp()
            .setDescription(embedDescription)
            .setThumbnail("https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif")

        message.channel.send(MessageEmbed)
    }
}
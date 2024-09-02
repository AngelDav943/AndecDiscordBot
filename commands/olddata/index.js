var fs = require('fs');
var commands = fs.readdirSync(__dirname);

/*
let description = ``
for (var i=0; i < commands.length; i++) {
    let cmddescr = ""
    cmddescr = require(__dirname+"/"+commands[i]).description

    if (require(__dirname+"/"+commands[i]).type == "datastore test") {
        commands[i] = commands[i].split(".js").join("")
        description = description+` **;data.${commands[i]}** | ${cmddescr} \n\n `
    }
}
    */

module.exports = {
    type: "datastore test",
    description: "datastore/database command list ",

    perms: "botcreator",

    async execute(message, args, discord) {
        var MessageEmbed = new discord.MessageEmbed()
            .setTitle('***Datastore commands***')
            .setTimestamp()
            .setDescription("description")
            .setThumbnail("https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif")

        message.channel.send(MessageEmbed)
    }
}
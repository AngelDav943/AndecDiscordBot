module.exports = {
    description:"Help menu",
    async execute(message, args, discord) {
        var MessageEmbed = new discord.MessageEmbed()
                .setTitle('***Help menu***')
                .setTimestamp()
                .setDescription(`Hello, im AndecTestBot. ***(Created by AngelDav943)*** \n You can see the commands with ;cmds. \n\n Need help with an error with the bot? You can talk with the creator using these contacts. \n **Twitter:** https://twitter.com/AndecStudios \n **Discord:** https://discord.com/invite/k5K82bz`)
                .setThumbnail("https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif")

        message.channel.send(MessageEmbed)
    }
}
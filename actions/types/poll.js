/*
//EXAMPLE JSON
{
    "channelID": "102132435465768798",
    "timestamp": 123456789,
    "type": "embed",

    "color": "#0099ff",
    "title": "Lorem ipsum",
    "description": "Lorem ipsum dolor sit amet",
}
//*/

module.exports = {
    async execute(channel, data, client, discord) {
        var embedMessage = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Poll has ended.")
            .setDescription(`**Question:** ${pollargs[0]} \n ${agree}: ${agreereact.count - 1} \n \n ${disagree}: ${disagreereact.count - 1} \n \n The vote ${winner} won the poll. `)
            .setURL(data.url)
            .setTimestamp()
        /*
        if (data["thumbnail"]) embedMessage.setThumbnail(data.thumbnail)
        if (data["image"]) embedMessage.setImage(data.image)
        if (data["fields"]) embedMessage.addFields(...data.fields)
        if (data["author"]) embedMessage.setAuthor(...data.author)
        */
        channel.send(embedMessage)
    }
}
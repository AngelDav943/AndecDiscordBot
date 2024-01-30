/*
//EXAMPLE JSON
{
    "channelID": "102132435465768798",
    "timestamp": 123456789,
    "type": "embed",

    "color": "#0099ff",
    "title": "Lorem ipsum",
    "description": "Lorem ipsum dolor sit amet",
    "thumbnail": "https://www.example.com/image.png",
    "image": "https://www.example.com/image.png",
    "fields": [
        { "name": "Lorem", "value": "Ipsum" }
    ],
    "url": "https://www.example.com/",
    "author": {
        "name": "John Doe",
        "iconURL": "https://www.example.com/image.png",
        "url": "https://www.example.com"
    },
    "footer": {
        "text": "Some footer text here",
        "iconURL": "https://www.example.com/image.png"
    }
}
//*/

module.exports = {
    async execute(channel, data, client, discord) {
        var embedMessage = new discord.MessageEmbed()

        //if (data["timestamp"]) embedMessage.setTimestamp()
        if (data["color"]) embedMessage.setColor(data.color)
        if (data["title"]) embedMessage.setTitle(data.title)
        if (data["description"]) embedMessage.setDescription(data.description)
        if (data["thumbnail"]) embedMessage.setThumbnail(data.thumbnail)
        if (data["image"]) embedMessage.setImage(data.image)
        if (data["fields"]) embedMessage.addFields(...data.fields)
        if (data["url"]) embedMessage.setURL(data.url)
        if (data["author"]) embedMessage.setAuthor(...data.author)

        channel.send(embedMessage)
    }
}
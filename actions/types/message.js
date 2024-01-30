/*
//EXAMPLE JSON
{
    "channelID": "102132435465768798",
    "timestamp": 123456789,
    "type": "message",

    "content": "Lorem ipsum.."
}
//*/

module.exports = {
    async execute(channel, data, client, discord) {
        channel.send(data.content)
    }
}
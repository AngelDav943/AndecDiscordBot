module.exports = {
    type:"test",
    hided:true,
    description:"just a voicechannel test",
    async execute(message, args) {
        try {
            const connection = await message.member.voice.channel.leave();
        } catch(err) {
            message.channel.send("error "+err)
        }
    }
}
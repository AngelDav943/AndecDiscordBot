module.exports = {
    description:"🏓",
    async execute(message, args) {
        let textargs = args
        textargs[0] = ""
        textargs = textargs.join(" ")
        message.react("🏓")
        var botmsg = await message.reply("pong"+/*textargs+*/"!")
        botmsg.react("🏓")
    }
}
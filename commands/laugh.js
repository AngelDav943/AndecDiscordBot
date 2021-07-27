module.exports = {
    description:"🤣",
    async execute(message, args) {
        let textargs = args
        textargs[0] = ""
        textargs = textargs.join(" ")
        message.channel.send("🤣"/*+textargs*/)
    }
}
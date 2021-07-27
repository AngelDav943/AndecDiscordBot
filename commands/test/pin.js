/*
command = ;pin (message)
function = the bot will send one message like "@someone pinned: (message)" and will pin it.
permissions = admin
*/
module.exports = {
    hided: true,
    description:"this command is not finished",
    async execute(message, args) {
        message.channel.send("This command is still in development")
    }
}
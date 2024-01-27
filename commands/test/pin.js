/*
command = ;pin (message)
function = the bot will send one message like "@someone pinned: (message)" and will pin it.
permissions = admin
*/
module.exports = {
    hidden: true,
    description:"this command is not finished",

    perms: "botcreator",
    
    async execute(message, args) {
        message.channel.send("This command is still in development")
    }
}
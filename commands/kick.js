module.exports = {
    perms:"admin",
    description:"Only people with the permission of [**Kick members**], this command kicks the person you mention.",
    async execute(message, args) {
        if (message.member.permissions.has("KICK_MEMBERS")) {
            const target = message.mentions.users.first();
            if (!args[1]) return message.channel.send("You need to state a user to kick **( kick @user [reason] )**")
            if (!target) return message.channel.send("<@!" + message.author.id + ">" + ", This person wasnt found in this server");

            let reason = args[2];
            if (!reason) return reason = "No reason given"

            try {
                await target.send("You were kicked from " + message.guild.name + " by " + "<@!" + message.author.id + ">");
            } catch (err) {
                console.log(err)
            }

            try {
                await target.kick("Reason: " + reason + " kicked by: <@!" + message.author.id + ">")
            } catch (err) {
                return console.log(err)
            }
            return
        }
    }
}
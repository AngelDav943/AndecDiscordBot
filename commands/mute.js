const ns = require("ms");

module.exports = {
    perms:"Mod",
    description:"Only people with the permission of [**Kick members**], this command mutes the person you mention. (Server needs an already existing 'muted' role)",
    async execute(message, args, Discord, client) {
        if (message.member.permissions.has("KICK_MEMBERS")) {
            const target = message.mentions.users.first();
            if (!target) return message.channel.send("<@!" + message.author.id + ">" + ", This person wasnt found in this server");
            if (target.id == client.user.id) return message.channel.send("Not enough permissions to mute this user.")

            let muteRole = message.guild.roles.cache.find(role => role.name == "Muted");
            let memberTarget = message.guild.members.cache.get(target.id);
            if (!muteRole) return message.channel.send("Muted role not found")

            memberTarget.roles.add(muteRole.id);
            if (!args[2]) {
                message.channel.send("<@!" + memberTarget.user.id + "> has been muted by <@!" + message.author.id + ">, no time limit specified.");
                return;
            }

            message.channel.send("<@!" + memberTarget.user.id + "> has been muted by <@!" + message.author.id + ">, for " + args[2] + ".");
            setTimeout(function() {
                message.channel.send("<@!" + memberTarget.user.id + "> has been unmuted after " + args[2] + ".");
                memberTarget.roles.remove(muteRole.id);
            }, ns(args[2]));
        }
    }
}
const ns = require("ms");

module.exports = {
    perms:"Mod",
    description:"Only people with the permission of [**Kick members**], this command unmutes the person you mention.",
    async execute(message, args) {
        if (message.member.permissions.has("KICK_MEMBERS")) {
            const target = message.mentions.users.first();

            if (!target) return message.channel.send("<@!" + message.author.id + ">" + ", This person wasnt found in this server");

            let muteRole = message.guild.roles.cache.find(role => role.name == "Muted");
            let memberTarget = message.guild.members.cache.get(target.id);
            
			if (!args[2]) {
				message.channel.send("<@!" + memberTarget.user.id + "> has been unmuted by <@!" + message.author.id + ">.");
				memberTarget.roles.remove(muteRole.id);
                return;
            }

			message.channel.send("<@!" + memberTarget.user.id + "> will be unmuted in"+ args[2] +", by <@!" + message.author.id + ">.");
            setTimeout(function() {
                message.channel.send("<@!" + memberTarget.user.id + "> has been unmuted after " + args[2] + ".");
                memberTarget.roles.remove(muteRole.id);
            }, ns(args[2]));
            
        }
    }
}
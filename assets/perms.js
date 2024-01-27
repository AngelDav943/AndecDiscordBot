module.exports = {
    async returnperms(message, perms) {
		const mod_level = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("ADMINISTRATOR");
		if (!perms) return true
		switch(perms.toLowerCase()) {
			case "botcreator":
				if (message.author.id == 356115020721029132) return true
			break;

			case "admin":
				if (mod_level) return true
			break;

			case "mod":
				if (mod_level) return true
			break;

            case "none":
				return true
			break;

			default:
				return true
			break;
		}
		return false
    }
}
module.exports = {
    async returnperms(message, perms) {
		if (!perms) return true
		switch(perms.toLowerCase()) {
			case "botcreator":
				if (message.author.id == 356115020721029132) return true
			break;

			case "admin":
				if (message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("ADMINISTRATOR") ) return true
			break;

			case "mod":
				if (message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("ADMINISTRATOR") ) return true
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
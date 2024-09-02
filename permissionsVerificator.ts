import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export enum commandPermissionLevel {
	"botcreator" = 255,
	"admin" = 254,
	"mod" = 250,
	"none" = 0
}

export async function verificator(interaction: ChatInputCommandInteraction, perms: commandPermissionLevel): Promise<boolean> {
	if (interaction.member == null) return false;

	const permissions: Readonly<PermissionsBitField> = interaction.member.permissions as PermissionsBitField;

	const admin_level = permissions.has("Administrator")
	const mod_level = permissions.has("KickMembers")

	switch (perms) {
		case commandPermissionLevel.botcreator:
			if (interaction.member.user.id == '356115020721029132') return true
			break;

		case commandPermissionLevel.admin:
			if (admin_level) return true
			break;

		case commandPermissionLevel.mod:
			if (mod_level || admin_level) return true
			break;

		case commandPermissionLevel.none:
			return true
			break;

		default:
			return true
			break;
	}
	return false
	// */
}
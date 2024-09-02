import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

module.exports = {
    type:"",
    perms: commandPermissionLevel.none,
	data: new SlashCommandBuilder()
		.setName('laugh')
		.setDescription("🤣"),
    async execute(interaction: ChatInputCommandInteraction) {
        
        const deferredReply = await interaction.deferReply({
            ephemeral: true
        })

        await interaction.channel?.send({
            content: "🤣"
        })
        
        await deferredReply.delete()
    }
}
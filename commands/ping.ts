import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

module.exports = {
    type:"",
    perms: commandPermissionLevel.none,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("🏓"),
    async execute(interaction: ChatInputCommandInteraction) {
        const interactionReply = await interaction.reply({
            "content": "pong!"
        })

        const message = await interactionReply.fetch()
        await message.react("🏓");
    }
}
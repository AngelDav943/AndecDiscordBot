import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "./permissionsVerificator";

module.exports = {
    type:"",
    perms: commandPermissionLevel.none,
	hidden: true,
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription("Gives you a list of all the available commands on the bot!"),
    async execute(interaction: ChatInputCommandInteraction) {
        
    }
}
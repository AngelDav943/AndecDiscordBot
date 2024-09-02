import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

const config = require("../config.json");

module.exports = {
    type:"",
    perms: commandPermissionLevel.none,
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription("Gives you the current version of the bot"),
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: config["version"],
            ephemeral: true
        })
    }
}
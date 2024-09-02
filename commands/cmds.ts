import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getCommandsJSON } from "../commandSearch";
import { Command } from "../utils";

module.exports = {
	hidden: false,
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription("Gives you a list of all the available commands on the bot!"),
	async execute(interaction: ChatInputCommandInteraction) {
		const commandList = getCommandsJSON();

		let commandListDescription = ""
		for (const key in commandList) {
			const command = commandList[key] as Command
			if ('data' in command) {
				commandListDescription += `**/${command.data.name}** - *${command.data.description}* \n`
			}
		}

		await interaction.reply({
			embeds: [
				{
					title: "***Commands***",
					thumbnail: {
						url: 'https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif'
					},
					description: commandListDescription,

					footer: {
						text: "https://angeldav.net"
					}
				},
			],
			ephemeral: false
		})
	}
};
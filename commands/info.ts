import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

const config = require("../config.json");

module.exports = {
    type: "",
    perms: commandPermissionLevel.none,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('information')
        .setDescription("Gives you information about the bot"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            embeds: [
                {
                    title: "***Commands***",
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif'
                    },
                    description: "Hello, im AndecTestBot. ***(Created by AngelDav943)*** \n To see the available commands use */commands*. \n\n",
                    fields: [
                        {
                            name: "Links",
                            value: "Twitter: https://twitter.com/AndecStudios \n Discord group: https://discord.com/invite/k5K82bz \n Website: https://angeldav.net"
                        },
                        { 
                            "name": "Bot's running version", 
                            "value": String(config["version"]) 
                        }
                    ]
                },
            ],
            ephemeral: false
        })
    }
}
import { REST, Routes } from "discord.js";
import { getCommandsArray } from "./commandSearch";

require('dotenv').config()
const config = require("./config.json");

// BOT SLASH COMMANDS DEPLOYMENT
const discordRestApi = new REST().setToken(process.env['BOT_KEY'] || "");
const SlashCommands = getCommandsArray();

async function deploySlashCommands() {
    try {
        console.log(`Deploying ${SlashCommands.length} slash (/) commands`)

        const data = await discordRestApi.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: SlashCommands }
        )
    } catch (error) {
        // Catch and print any resulting errors
        console.error(error)
    }
}
deploySlashCommands()
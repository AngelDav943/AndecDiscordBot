import {
    Client,
    ClientUser,
    ChatInputCommandInteraction,
    GatewayIntentBits,
    Events,
    ActivityType,
    Interaction,
    CacheType
} from "discord.js";
import { Command, consoleColor, consoleTextColors } from "./utils";
import { getCommandsCollection, getCommandsJSON } from "./commandSearch";
import { commandPermissionLevel, verificator } from "./permissionsVerificator";

const actions = require('./actions/actions.js')

const express = require("express");
const app = express()
const page = require('angeldav-loaderhtml');
const config = require("./config.json");
var port = config["port"] || 80;

require('dotenv').config()

// const Discord = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages
    ]
});

client.on(Events.ClientReady, async (readyClient: Client) => { // When bot is online
    page.default.other["servers"] = client.guilds.cache.size

    const clientUser: ClientUser = readyClient.user!;

    consoleColor(consoleTextColors.Green, `${clientUser.username} is now ONLINE!, conected in ${client.guilds.cache.size} servers.`)

    clientUser.setPresence({
        activities: [
            {
                name: "Bot created by AngelDav943",
                url: "https://angeldav.net",
                type: ActivityType.Custom
            },
            {
                name: "bot stuff",
                state: "Amazing stuff happening",
                url: "https://angeldav.net",
                type: ActivityType.Listening
            }
        ],
        status: 'online'
    })

});

var prefix = config.prefix;
var randommessage = {
    message: undefined,
    content: ""
};

const commandCollection = getCommandsCollection();
client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
    if (interaction.isChatInputCommand() == false) return;
    
    const commandPath = commandCollection.get(interaction.commandName);

    if (!commandPath) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    Object.keys(require.cache).forEach((key) => {
        if (key.includes("node_modules")) return;
        delete require.cache[key];
    });

    const command: Command = require(commandPath);
    
    if (await verificator(interaction, command.perms || commandPermissionLevel.none) == false) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply('There was an error while executing this command!');
        }
    }
})

/*
// execute all actions saved in queue..
actions.execute(Discord, client);
*/

// WEBSITE STARTS HERE
page.url = `http://localhost:${port}`
page.default.template = `${__dirname}/assets/templates/base.html`
page.default.notfound = `${__dirname}/pages/error.html`

page.default.other = {
    templateheader: `${__dirname}/assets/public/components/navigator.html`,
    config: config,
    randmessage: "",
    servers: "fetching..",
    // slashCommands: JSON.stringify(getCommandsJSON(true))
};

// app.get('/getBotData', function (req, res) {
//     if (randommessage.message) {
//         if (randommessage.message.deleted ) {
//             randommessage.content = '"This message got deleted" -someone';
//             randommessage.message = undefined;
//         } else {
//             randommessage.content = ` "${randommessage.message.content}" -${randommessage.message.author.username} `
//         }
//     }
//     res.json({
//         message: randommessage.content,
//         serversOn: client.guilds.cache.size,
//     });
// });

app.use('/public', express.static('assets/public'));
const pageloader = require(`angeldav-test-pageloader`)(page, {
    "app": app,
    "path": `${__dirname}/view`
})
// WEBSITE ENDS HERE */

const listener = app.listen(process.env.PORT, () => {
    port = listener.address().port;
    page.url = `http://localhost:${port}`;
    console.log(`http://localhost:${port}`)
    consoleColor(consoleTextColors.Blue, `Server started, port located at ${listener.address().port}`);
});

client.login(process.env['BOT_KEY']);
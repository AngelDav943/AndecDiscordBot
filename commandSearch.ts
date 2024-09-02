import { Collection, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Command, warnColor } from "./utils";
import { readdirSync, statSync } from "fs";

const SlashCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
const CommandsCollection: Collection<string, string> = new Collection();

const maxIterations = 10

type commandJsonTable = Record<string, Command | Record<string, any>>
function buildSlashCommands(
    currentFolder: string,
    showHidden: boolean = true,
    sendJSON: boolean = false, //jsonTable?: commandJsonTable,
    iterations?: number
) {

    if (iterations == undefined) iterations = 1
    if (iterations >= maxIterations) return;

    const commands = readdirSync(currentFolder);
    const jsonTable: commandJsonTable = {}

    for (var i = 0; i < commands.length; i++) {
        var commandName: string = commands[i];
        var stats = statSync(currentFolder + '/' + commandName);

        // Check if it's a file or a folder
        if (stats.isFile()) {
            const command: Command = require(`${currentFolder}/${commandName}`)

            // Verifies that the command module contains a 'data' parameter and an 'execute' method
            if ('data' in command == false || 'execute' in command == false) {
                warnColor(`[WARNING] The command ${commandName} does not contain required data to function ('data' parameter or 'execute' function)`)
                continue;
            }

            if (command.data == null) continue;

            if (sendJSON == true) {
                if (command.hidden != true || showHidden == true) {
                    jsonTable[command.data.name] = { ...command }
                }
                continue;
            }

            // Inserts command to the CommandsCollection to be easily searchable
            CommandsCollection.set(command.data.name, `${currentFolder}/${commandName}`);

            // Inserts command to the SlashCommand array to deploy
            SlashCommands.push(command.data.toJSON());
        }
        else {
            // Check commands inside if it's a folder
            const list = buildSlashCommands(`${currentFolder}/${commandName}`, showHidden, sendJSON, iterations + 1)
            if (sendJSON && list) jsonTable[commandName] = {...list}
        }
    }

    if (jsonTable) return jsonTable
}

export function getCommandsArray(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    buildSlashCommands(`${__dirname}/commands`)
    return SlashCommands;
}

export function getCommandsCollection(): Collection<string, string> {
    buildSlashCommands(`${__dirname}/commands`)
    return CommandsCollection;
}

export function getCommandsJSON(showHidden: boolean = false): commandJsonTable | undefined {
    const list = buildSlashCommands(`${__dirname}/commands`, showHidden, true)
    return list
}
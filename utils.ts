import { CacheType, ChatInputApplicationCommandData, ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "./permissionsVerificator";

export enum consoleTextColors {
    Black = 30,
    Red = 31,
    Green = 32,
    Yellow = 33,
    Blue = 34,
    Magenta = 35,
    Cyan = 36,
    White = 37,
}

export enum consoleBackgroundColors {
    Black = 40,
    Red = 41,
    Green = 42,
    Yellow = 43,
    Blue = 44,
    Magenta = 45,
    Cyan = 46,
    White = 47,
}

export interface Command {
    hidden?: boolean,
    perms?: commandPermissionLevel,
    data: SlashCommandBuilder,
    execute: (interaction: Interaction<CacheType>) => Promise<void>,
}

function colorifyString(colorCode: consoleTextColors | consoleBackgroundColors, ...message: string[]) {
    return `\x1b[${colorCode}m${message.join(" ")}\x1b[0m`
}

export function consoleColor(colorCode: consoleTextColors | consoleBackgroundColors, ...message: string[]) {
    console.log(colorifyString(colorCode, ...message))
}

export function warnColor(...message: any[]) {
    console.warn(colorifyString(consoleTextColors.Yellow, ...message))
}

export function errorColor(...message: any[]) {
    console.warn(colorifyString(consoleTextColors.Red, ...message))
}
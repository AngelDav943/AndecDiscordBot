import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

module.exports = {
    type: "",
    perms: commandPermissionLevel.none,
    data: new SlashCommandBuilder()
        .setName('hax')
        .setDescription("Hax ppl with this command!!!111! (Joke command)")
        .addUserOption(option => {
            return option
                .setName("target")
                .setDescription("The member to hax!!!")
                .setRequired(true)
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target');

        function getRand(maxNumber: number = 255) {
            return Math.floor(Math.random() * maxNumber)
        }
        const randomlyGeneratedFakeIp = `${getRand()}.${getRand()}.${getRand()}.${getRand()}.${getRand(100)}`

        interaction.reply({
            content: `${target} is got hacked by ${interaction.user}!!!!!!!!11!! \n ||${randomlyGeneratedFakeIp}||`
        })

        return "{hax:5}"
    }
}
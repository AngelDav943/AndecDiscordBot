import { ChatInputCommandInteraction, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { commandPermissionLevel } from "../permissionsVerificator";

module.exports = {
    perms: commandPermissionLevel.admin,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addUserOption(option => {
            return option
                .setName("target")
                .setDescription("The member to kick")
                .setRequired(true)
        })
        .addStringOption(option => {
            return option
                .setName("reason")
                .setDescription("Reason of kicking the user")
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.member == undefined) return;
        const permissions: Readonly<PermissionsBitField> = interaction.member.permissions as PermissionsBitField;

        console.log(interaction)
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided'

        if (!target) return await interaction.reply({
            content: `This person wasn't found in this server`,
            ephemeral: true
        })

        await interaction.reply({
            content: `${target} was kicked, Reason: ${reason}`,
            ephemeral: false
        })

        await target.send({
            content: `You were kicked from ${interaction.guild?.name}, reason: ${reason}`
        })

        await interaction.guild?.members.kick(target)

        return;
        /*
        if (permissions.has("KickMembers")) {
            const target = message.mentions.users.first();
            if (!args[1]) return message.channel.send("You need to state a user to kick **( kick @user [reason] )**")
            if (!target) return message.channel.send("<@!" + message.author.id + ">" + ", This person wasnt found in this server");

            let reason = args[2];
            if (!reason) return reason = "No reason given"

            try {
                await target.send("You were kicked from " + message.guild.name + " by " + "<@!" + message.author.id + ">");
            } catch (err) {
                console.log(err)
            }

            try {
                await target.kick("Reason: " + reason + " kicked by: <@!" + message.author.id + ">")
            } catch (err) {
                return console.log(err)
            }
            return
        }
        //*/
    }
}
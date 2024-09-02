//const ytdl = require('ytdl-core');
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    DiscordGatewayAdapterImplementerMethods,
    DiscordGatewayAdapterLibraryMethods,
    NoSubscriberBehavior
} from '@discordjs/voice'
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { consoleColor, consoleTextColors } from '../../../utils';

module.exports = {
    type: "test",
    data: new SlashCommandBuilder()
        .setName("testvoice")
        .setDescription("just a voicechannel test")
        .addStringOption(option => {
            return option
                .setName("url")
                .setDescription("A valid url that must contain a music file")
                .setRequired(true)
        }),
    async execute(interaction: ChatInputCommandInteraction) {

        const linkURL = interaction.options.getString("url")
        if (linkURL == null) {
            await interaction.reply({
                content: 'Invalid url',
                ephemeral: true
            })
            return
        }

        const deferredReply = await interaction.deferReply({
            ephemeral: false
        })

        async function attemptConnection(): Promise<boolean> {
            const member = interaction.member
            if (member == null) return false;

            const target = interaction.guild?.members.cache.get(member.user.id);
            if (target == null) return false;

            const voice = target.voice

            const channelID = voice.channelId
            const guildID = voice.guild.id
            if (guildID == null || guildID == undefined) return false
            if (channelID == null || channelID == undefined) return false

            try {
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    }
                });

                const voiceConnect = joinVoiceChannel({
                    channelId: channelID,
                    guildId: guildID,
                    adapterCreator: voice.guild.voiceAdapterCreator,
                })

                const audio = createAudioResource(`${linkURL}`/*`https://angeldav.net/audios/soundtrack/shop.mp3`*/, {
                    inputType: StreamType.Arbitrary
                })
                player.play(audio)

                voiceConnect.subscribe(player)

            } catch (error) {
                consoleColor(consoleTextColors.Red, "Voicechannel error", String(error))
                return false
            }

            return true
        }

        if (await attemptConnection()) {
            deferredReply.edit({
                content: `Playing: *${linkURL}*`
            })
        } else {
            deferredReply.edit({
                content: "Unsuccessful connection"
            })
        }

        //message.channel.send(__dirname+"/audios/"+args[1])
        //console.log(args)
        /*
        try {
            member.user
            const connection = await interaction.member?.voice.channel.join();
            console.log(connection)
        } catch (err) {
            message.channel.send(err)
        }
        */
        //console.log(connection.play(__dirname+"/audios/oof.mp3"))
        //connection.play(__dirname+"/audios/oof.mp3");
    }
}
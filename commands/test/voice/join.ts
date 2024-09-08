//const ytdl = require('ytdl-core');
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { consoleColor, consoleTextColors } from '../../../utils';
import {
    AudioPlayer,
    AudioResource,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    NoSubscriberBehavior,
    StreamType,
    VoiceConnection
} from '@discordjs/voice';

import youtubeDl from 'youtube-dl-exec';
import { platform } from 'os';

module.exports = {
    type: "test",
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays audio on the voicechannel you're in")
        .addAttachmentOption(option => {
            return option
                .setName("file")
                .setDescription("Plays the file if it's a valid video or audio")
        })
        .addStringOption(option => {
            return option
                .setName("url")
                .setDescription("A valid url that must contain a music link or yt")
        })
        .addBooleanOption(option => {
            return option
                .setName("loop")
                .setDescription("Let's you loop the song indefinetly")
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        if (platform() == "android") {
            await interaction.reply({
                content: 'Invalid architecture',
                ephemeral: true
            })
            return
        };

        const canLoop = interaction.options.getBoolean("loop")
        const linkURL = interaction.options.getString("url")
        const file = interaction.options.getAttachment("file")

        let songName: string = ""
        let songURL: string | null = null
        if (file) {
            songURL = file.url
            songName = file.name
        } else {
            if (linkURL != null) {
                songURL = linkURL
                songName = linkURL
            } else {
                await interaction.reply({
                    content: 'Invalid',
                    ephemeral: true
                })
                return
            }
        }

        const deferredReply = await interaction.deferReply({
            ephemeral: false
        })

        enum connectionStatus {
            Success = 1,
            Unsuccessful = -1,
            Error = 0
        }

        async function attemptConnection(): Promise<connectionStatus> {
            const member = interaction.member
            if (member == null) return connectionStatus.Unsuccessful;

            const target = interaction.guild?.members.cache.get(member.user.id);
            if (target == null) return connectionStatus.Unsuccessful;

            const voice = target.voice

            const channelID = voice.channelId
            const guildID = voice.guild.id
            if (guildID == null || guildID == undefined) return connectionStatus.Unsuccessful
            if (channelID == null || channelID == undefined) return connectionStatus.Unsuccessful

            try {
                const player: AudioPlayer = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    }
                });

                const voiceConnect: VoiceConnection = joinVoiceChannel({
                    channelId: channelID,
                    guildId: guildID,
                    adapterCreator: voice.guild.voiceAdapterCreator,
                })

                if (songURL == null) {
                    throw new Error("No url found for song")
                }

                async function getResource(link: string) {
                    if (link.includes("youtu.be") || link.includes("youtube.com")) {
                        const youtube_payload = await youtubeDl(link, {
                            dumpSingleJson: true,
                            noCheckCertificates: true,
                            noWarnings: true,
                            preferFreeFormats: true,
                            extractAudio: true,
                            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
                        })

                        const downloads = youtube_payload.requested_downloads
                        console.log("DOWNLOADS (", downloads.length, ")")

                        if (downloads.length < 1) {
                            deferredReply.edit({
                                content: `Error downloading video`
                            })
                            throw new Error("Unsuccessfull download")
                        }

                        const requestedDownload: any = downloads[0]

                        // console.log("YOUTUBELINK:", requestedDownload["url"]);
                        const audio: AudioResource = createAudioResource(`${requestedDownload["url"]}`, {
                            inputType: StreamType.WebmOpus,
                        })
                        return audio;
                    } else {
                        const audio: AudioResource = createAudioResource(`${link}`, {
                            inputType: StreamType.Arbitrary
                        })
                        return audio;
                    }
                }

                if (songURL) {   
                    const audio = await getResource(songURL)
                    player.play(audio)
                    voiceConnect.subscribe(player)

                    player.on("stateChange", e => {
                        if (e.status == "playing" && audio.ended && canLoop == true) {
                            const newResource = createAudioResource(songURL)
                            player.play(newResource)
                        }
                    })
                } else {
                    console.log("link not found", songURL)
                }

                // const audio: AudioResource = createAudioResource(`${linkURL}`/*`https://angeldav.net/audios/soundtrack/shop.mp3`*/, {
                //     inputType: StreamType.Arbitrary
                // })
                // player.play(audio)
                


            } catch (error) {
                consoleColor(consoleTextColors.Red, "Voicechannel error", String(error))
                deferredReply.edit({
                    content: `ERROR ${error}`
                })
                return connectionStatus.Error
            }

            return connectionStatus.Success
        }

        const connectionResult = await attemptConnection()
        switch (connectionResult) {
            case connectionStatus.Success:
                deferredReply.edit({
                    content: `Playing: *${songURL}*`
                })
                break;

            case connectionStatus.Unsuccessful:
                deferredReply.edit({
                    content: "Unsuccessful connection"
                })
                break;

            default:
                break;
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
//const ytdl = require('ytdl-core');
import {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} from '@discordjs/voice';

module.exports = {
    type:"test",
    hidden:true,
    description:"just a voicechannel test",
    async execute(message, args) {
        let connection;
        message.channel.send("Attempting connection...")
        //message.channel.send(__dirname+"/audios/"+args[1])
        //console.log(args)
        try {
            const connection = await message.member.voice.channel.join();
            console.log(connection)
        } catch(err) {
            message.channel.send(err)
        }
        
        //console.log(connection.play(__dirname+"/audios/oof.mp3"))
        //connection.play(__dirname+"/audios/oof.mp3");
    }
}
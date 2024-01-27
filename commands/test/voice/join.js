const ytdl = require('ytdl-core');

module.exports = {
    type:"test",
    hidden:true,
    description:"just a voicechannel test",
    async execute(message, args) {
        let connection;
        //message.channel.send(__dirname+"/audios/"+args[1])
        //console.log(args)
        try {
            connection = await message.member.voice.channel.join();
            
        } catch(err) {
            message.channel.send("error "+err)
        }
        
        //console.log(connection.play(__dirname+"/audios/oof.mp3"))
        //connection.play(__dirname+"/audios/oof.mp3");
    }
}
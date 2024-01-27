var fs = require('fs');

module.exports = {
    type:"datastore test",
    description:"test command index ",
    hidden:true,
    async execute(message, args, discord, client) {
		if (!args[1]) return message.channel.send(";test.voice ( join | leave )")
		console.log(args[1])
		if (args[1] == "join")
		{
			try {
	            connection = await message.member.voice.channel.join();
	            
	        } catch(err) {
	            message.channel.send("error "+err)
	        }
		}
		else if (args[1] == "leave")
		{
			try {
	            const connection = await message.member.voice.channel.leave();
	        } catch(err) {
	            message.channel.send("error "+err)
	        }
		}
		/*else if (args[1] == "customjoin")
		{
			let channelID = args[2]
		    let channel = client.channels.cache.get(channelID);
			if (channel) {
				console.log(channel);
				//connection = await channel.join();
			} 
		}*/
    }
}
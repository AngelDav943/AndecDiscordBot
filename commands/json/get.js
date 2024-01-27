const fs = require("fs")

module.exports = {
	type: "test",
	hidden: true,
	description: "just a test",
	/*perms: "botcreator",*/
	async execute(message, args, discord) {
		fs.readFile('data/users.json', 'utf8', function (err, data) {
			if (err) return message.channel.send("**Error: **" + err)

			// parse JSON string to JSON object
			const parsedData = JSON.parse(data);

			var embedFields = []
			Object.keys(parsedData).forEach(key => {
				embedFields.push({ name: key+":", value: parsedData[key] })
			})

			var MessageEmbed = new discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('json data')
				.addFields(...embedFields)

			message.channel.send(MessageEmbed)
		})
	}
}
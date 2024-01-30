var fs = require('fs');
var commands = fs.readdirSync(__dirname);
let description = ``;

for (var i = 0; i < commands.length; i++) {
	var cmd = commands[i];
	var stats = fs.statSync(__dirname + '/' + cmd);

	if (stats.isFile()) {
		let cmddescr = '';
		cmddescr = require(__dirname + '/' + cmd).description;

		if (require(__dirname + '/' + cmd).hidden != true) {
			cmd = cmd.split('.js').join('');
			description = description + ` **;${cmd}** | ${cmddescr} \n\n `;
		}
	} else {
		var foldercmds = fs.readdirSync(__dirname + '/' + cmd);
		for (var f = 0; f < foldercmds.length; f++) {
			let dir = __dirname + '/' + cmd + '/' + foldercmds[f];
			try {
				let cmddescr = require(dir).description;

				if (require(dir).hidden != true) {
					foldercmds[f] = '.' + foldercmds[f].split('.js').join('');
					if (foldercmds[f] == '.index') foldercmds[f] = '';
					description =
						description + ` **;${cmd}${foldercmds[f]}** | ${cmddescr} \n\n `;
				}
			} catch (err) {}
		}
	}
}

module.exports = {
	hidden: true,
	description: 'This commands shows a list of all the commands the bot haves',
	async execute(message, args, discord) {
		var MessageEmbed = new discord.MessageEmbed()
			.setTitle('***Commands***')
			.setTimestamp()
			.setDescription(description)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/817044739319791646/819605526429827122/0001-0110.gif'
			);

		message.channel.send(MessageEmbed);
	}
};
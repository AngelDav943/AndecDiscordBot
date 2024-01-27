let fetch = require('node-fetch');

function timeFromTimestamp(timestamp, hidetime) {
	var d = new Date(timestamp);
	time = {
		"day": d.getDate(),
		"month": d.getMonth() + 1,
		"year": d.getFullYear(),
		"hours": d.getHours(),
		"minutes": d.getMinutes()
	}
	for (var t in time) {
		if (time[t] < 10) time[t] = `0${time[t]}`
	}
	
	timeStampCon = time.day + '/' + time.month + '/' + time.year;
	if (hidetime != true) timeStampCon += " " + time.hours + ':' + time.minutes
	
	return timeStampCon;
}

module.exports = {
    type:"",
    hidden:false,
    perms:"",
    description:"This command can give you user data from the https://angeldc943.repl.co webiste",

    perms: "botcreator",

    async execute(message, args, discord) {
        let fetch_url = 'https://angeldc943.repl.co/api/users/get'
        message.channel.send("Showing data of user with id: "+args[1])

        const response = await fetch(fetch_url);
        const data = await response.json();

        let user = data[args[1]-1]
        if (user) {
            var MessageEmbed = new discord.MessageEmbed()
                .setTitle(`***${user.displayname}*** @${user.name}`)
                .setDescription(`Description: ${user.description.replace(/<br>/g,"\n")} \n`+
                    `Coins: ${user.currency || 0} \n`+
                    `First seen: ${timeFromTimestamp(user["first-login"], true)} \n`+
                    `Last seen: ${timeFromTimestamp(user["last-login"], true)} \n`+
                    `Badges: ${JSON.stringify(user.badges)} \n`+
                    `Banned: ${user.banned} \n`+
                    `ID: ${user.id+1}`
                )
                .setThumbnail(
                    'https://angeldc943.repl.co/assets/images/userprofiles/'+(user.id+1)+'.png'
                );

            message.channel.send(MessageEmbed);
        } else {
            message.channel.send("User not found!")
        }
    }
}
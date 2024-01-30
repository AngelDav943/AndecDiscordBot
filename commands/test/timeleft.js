var fs = require('fs');

module.exports = {
    type:"datastore test",
    description:"test command index ",
    hidden:true,
    async execute(message, args, discord) {
		//1641013200000
		var difference = 1735707600000 - Date.now()

		const time = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};

		for (var t in time) {
			if (time[t] < 10) time[t] = `0${time[t]}`
		}

		if (difference > 0) {
			if (difference < 8.64e+7) return message.channel.send (`Year ends in: ${time.hours}:${time.minutes}:${time.seconds}!!!!!!!!!!!`)
        	return message.channel.send(`${time.days} days left`)
		} else {
			message.channel.send (`HAPPY NEW YEAR!!!!`)
		}
    }
}
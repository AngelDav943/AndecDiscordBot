const fs = require("fs");
const types = fs.readdirSync(__dirname + "/types/");

module.exports = {
    async create(data, delayms) {
        var extra = {}

        // set target timestamp if there's a custom delay parameter
        if (delayms != undefined && typeof (delayms) == "number") extra["timestamp"] = Date.now() + delayms

        const rawData = fs.readFileSync(__dirname + '/queued.json', { encoding: 'utf8' })
        var queuedActions = JSON.parse(rawData)
        queuedActions.push({ ...extra, ...data })

        fs.writeFile(__dirname + '/queued.json', JSON.stringify(queuedActions), 'utf8', (err) => {
            if (err) console.error(`Error rewriting queue file: ${err}`);
        });
    },

    async execute(discord, client) {
        const fileData = fs.readFileSync(__dirname + '/queued.json', { encoding: 'utf8' })
        var queuedActions = JSON.parse(fileData)

        // return if the queue is empty
        if (queuedActions.length <= 0) return

        for (let index = 0; index < queuedActions.length; index++) {
            const action = queuedActions[index]
            const filename = String(action.type || "message").toLowerCase() + ".js"
            
            // return if there's no channelID specified
            if (action["channelID"] == undefined && action["guildID"] == undefined) continue
            
            // return if action's type is non existant
            if (types.includes(filename) == false) continue
            
            /*console.log(client.guilds)
            const guild = await client.guilds.fetch(action.guildID)
            console.log("guild found: ", guild != undefined)*/
            const channel = await client.channels.fetch(action.channelID)
            console.log("channel found: ", channel != undefined)
            if (channel == undefined) continue

            // waiting time (in milliseconds) until action is executed (minimum: 0ms)
            const waitingTime = Math.max(0, (action.timestamp || 0) - Date.now())
            console.log("waiting: ", waitingTime)
            setTimeout(function () {
                queuedActions.splice(index, 1);

                fs.writeFile(__dirname + '/queued.json', JSON.stringify(queuedActions), 'utf8', (err) => {
                    if (err) console.log(`Error rewriting queue file: ${err}`);
                });

                require(`${__dirname}/types/${filename}`).execute(channel, action, client, discord);
            }, waitingTime)

        }
    }
}
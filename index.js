const actions = require('./actions/actions.js')

const express = require("express");
const app = express()
const page = require('angeldav-loaderhtml');
const config = require("./config.json");
const port = config["port"] || 80;

const Discord = require("discord.js");
const client = new Discord.Client(/*{ intents: [GatewayIntentBits.Guilds] }*/);

require('dotenv').config()

const fs = require("fs")

client.on("ready", async (message) => { // When bot is online
    page.default.other["servers"] = client.guilds.cache.size
    console.log(`${client.user.username} is now ONLINE!, conected in ${client.guilds.cache.size} servers.`);
    client.user.setPresence({
        activity: {
            name: `| ${prefix}info | Bot created by AngelDav943. |`,
            type: `PLAYING`,
        },
        status: `offline`
    })
});

var prefix = config.prefix;
var randommessage = {
    message: undefined,
    content: ""
};

client.on('message', async message => {
    if (message.author.bot) return

    let saveProb = Math.random();
    //console.log(saveProb);
    if (!message.content.startsWith(prefix) && saveProb >= 0.87) {
        console.log(`${message.author.username} said: "${message.content}" `)
        randommessage.message = message;

        page.default.other["randmessage"] = `"${randommessage.message.content}" -${randommessage.message.author.username}`
    }

    if (!message.content.startsWith(prefix)) return // if the command doesnt start with prefix return

    var args = message.content.substring(prefix.length).toLowerCase().split(" ");
    var cmd = args[0]
    args[0] = undefined

    if (!cmd) return // if theres no command like " ;info " return nothing  

    let cmdroute = (__dirname + "/commands/" + cmd.split(".").join("/"))
    var cmdstats = undefined

    try {
        try { // Detect if the file of the command is folder or not
            cmdstats = fs.statSync(cmdroute)
        } catch (err) {
            cmdstats = fs.statSync(cmdroute + ".js")
        }

        // Redirect command of (command type) to index.js
        if (!cmdstats.isFile()) cmdroute = cmdroute + "/index"
    } catch (err) {

    }

    var cmdreq = undefined
    try {
        cmdreq = require(cmdroute + ".js")
        require(cmdroute + ".js")
    } catch (err) {
        let errorarray = String(err).split(" ")
        // if error code is "MODULE_NOT_FOUND" notify that the command doesnt exist
        if (err.code == "MODULE_NOT_FOUND") console.log(`COMMAND '${cmdroute}' NOT FOUND`)
        //console.error(err)
        //console.error(`Error code: ${err.code}`)
    }

    // leftover command data? (currently not in use)
    let cmddata

    try {
        require("./assets/perms.js").returnperms(message, cmdreq.perms).then(async perms => { // Checks the permissions needed to run the command
            if (!perms) return message.channel.send("Error: **You dont have enough permissions**")

            try {
                cmdreq.execute(message, args.join(" ").split(" "), Discord, client).then(data => {
                    cmddata = data
                });
            } catch (err) {
                //await message.channel.send("**Error:** "+err)
                console.error(err)
            }
        });
    } catch (err) {
        console.log(err.code)
    }
});

// execute all actions saved in queue..
actions.execute(Discord, client);

// WEBSITE STARTS HERE
page.url = `http://localhost:${port}`
page.default.template = `${__dirname}/assets/templates/base.html`
page.default.notfound = `${__dirname}/pages/error.html`

page.default.other = {
    templateheader: `${__dirname}/assets/public/components/navigator.html`,
    config: config,
    randmessage: "",
    servers: "fetching.."
};

/*
app.get('/getBotData', function (req, res) {
    if (randommessage.message) {
        if (randommessage.message.deleted ) {
            randommessage.content = '"This message got deleted" -someone';
            randommessage.message = undefined;
        } else {
            randommessage.content = ` "${randommessage.message.content}" -${randommessage.message.author.username} `
        }
    }
    res.json({
        message: randommessage.content,
        serversOn: client.guilds.cache.size,
    });
});//*/

app.use('/public', express.static('assets/public'));
const pageloader = require(`angeldav-test-pageloader`)(page, {
    "app": app,
    "path": `${__dirname}/view`
})
// WEBSITE ENDS HERE

const listener = app.listen(port, () => {
    console.log(`Server started, port located at ${port}`);
    console.log(`http://localhost:${port}`)
});

client.login(process.env['BOT_KEY']);
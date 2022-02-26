let express = require("express")
let app = express()
let Discord = require("discord.js");
let client = new Discord.Client();
let cors = require('cors')
require('dotenv').config()

let fs = require("fs")
let ns = require("ms");
let config = require("./config.json");

let Database = require("@replit/database");
let db = new Database();

app.use(cors())

let listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
    console.log("Server started")
})

client.on("ready", async (message) => { // When bot is online
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
    message:undefined,
    content:""
};

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
});

client.on('message', async message => {
    
    let saveProb = Math.random();
    //console.log(saveProb);
    if (!message.content.startsWith(prefix) && saveProb >= 0.87 && message.author.bot == false) {
        console.log(message)
        randommessage.message = message;
    }

	if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return // if the command doesnt start with prefix return
    
    var args = message.content.substring(prefix.length).toLowerCase().split(" ");
    var cmd = args[0]
    args[0] = undefined

    if (!cmd) return // if theres no command like " ;info " return nothing  

    let cmdroute = (__dirname+"/commands/"+cmd.split(".").join("/"))
    var cmdstats = undefined

	try {
		try { // Detect if the file of the command is folder or not
			cmdstats = fs.statSync(cmdroute)
		} catch (err) {
			cmdstats = fs.statSync(cmdroute+".js")
		}

		if (!cmdstats.isFile()) { // Redirect command of (command type) to index.js
			cmdroute = cmdroute+"/index"
		}
	} catch(err) {

	}
    

	var cmdreq = undefined
    try {
        cmdreq = require(cmdroute +".js")
        require(cmdroute +".js")
    } catch (err) {
        let errorarray = String(err).split(" ")
		console.log(err.code)
        if (err.code == "MODULE_NOT_FOUND") { // If the error code is "MODULE_NOT_FOUND" notify to the player that the command doesnt exist
            console.log(err.code)
            console.log(`Error code: ${err.code}`)
        } else {
            console.log(err.code)
            console.log(`EError code: ${err.code}`)
        }
        
    }

    let cmddata

    try {
        /*Object.keys(require.cache).forEach(key => { 
            delete require.cache[key]
        })*/
        require("./assets/perms.js").returnperms(message, cmdreq.perms).then( async perms => { // Checks the permissions needed to run the command
            if (!perms) return message.channel.send("Error: **You dont have enough permissions**")

            try {
                cmdreq.execute(message,args.join(" ").split(" "),Discord,db).then(data => {
                    cmddata = data
                });
            } catch (err) {
                await message.channel.send("**Error:** "+err)
                console.log(`EEError code: ${err.code}`)
            }
        });
    } catch (err) {
        console.log(err.code)
    }
    //console.log(cmddata)
    
});


var last = ""
app.get(process.env.httpservice_send, function (req, res) {
    let channelID = req.params["channel"]
    let msg = req.params["message"]
    let channel = client.channels.cache.get(channelID);
	if (last != msg) {
    	channel.send(msg);
    	res.send(msg);
	} 
	else
	{
		res.send("not sent")
	}
	last = msg
});

app.use(function(req, res) {
    res.redirect("https://angeldc943.repl.co/")
});

client.login(process.env['BOT_KEY']);
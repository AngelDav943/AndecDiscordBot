const ns = require("ms");

let agree = "👍"
let disagree = "👎"

function GetArgsReq(cmdargs,split) {
    var req = ""
    for (var i=1; i < cmdargs.length; i++) {
        req = req+" "+cmdargs[i]
    }
    return req
}

module.exports = {
    type:"none",
    description:"Creates a poll",
    async execute(message, args, discord) {
        var req = GetArgsReq(args).split(" ")
        // Separating poll arguments
        var pollargs = GetArgsReq(req).split("|")
        if (!pollargs[1]) return message.channel.send("You need to state the vote message and time **(example: createpoll (example: Do you like apples?) | (example: 5d) )**")
        
        // Getting the time
        var timeargs = pollargs[1].split(" ")
        var MessageEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Poll')
            .setDescription(`**Question:** ${pollargs[0]} \n **Time:** ${timeargs.join(" ")}`)
            .setTimestamp()
        
        var msg = await message.channel.send(MessageEmbed)
        await msg.react(agree);
        await msg.react(disagree);
        
        setTimeout( async function() {
            let winner
            let agreereact = undefined
            let disagreereact = undefined
            try {
                agreereact = await msg.reactions.cache.get(agree)
                disagreereact = await msg.reactions.cache.get(disagree)
            } catch (err) {
                message.channel.send("Error in poll: "+err)
                console.log(err)
            }
            if ( agreereact == undefined || disagreereact == undefined ) return message.channel.send("**Error:** *Reactions not found*")
            if (agreereact.count-1 > disagreereact.count-1) {
                winner = agree
            } else if (agreereact.count-1 == disagreereact.count-1) {
                winner = "**tie**"
            } else {
                winner = disagree
            }
            
            var PollEndEmbed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Poll Ended')
                .setDescription("**Question:** "+pollargs[0]+`\n ${agree}: ${agreereact.count-1} \n \n ${disagree}: ${disagreereact.count-1} \n \n The vote ${winner} won the poll. `)
                .setTimestamp()
            message.channel.send(PollEndEmbed)
        }, ns(timeargs[1]));
    }
}
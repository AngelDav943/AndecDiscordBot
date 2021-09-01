module.exports = {
    type:"",
    hided:true,
    perms:"Mod",
    description:"",
    async execute(message, args, discord) {
        message.channel.send(message.guild.memberCount)
    }
}
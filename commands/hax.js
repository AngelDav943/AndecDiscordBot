module.exports = {
    description:"Hax ppl with this command!!!111! (Joke command)",
    //perms:"Mod",
    hidden:true,
    async execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("<@!" + message.author.id + ">" + ", This person wasnt found in this server");
        if (target.id == 356115020721029132) return message.channel.send("You cant hax my creator!")
        message.channel.send("<@!" + target.id + "> is got hacked by <@!" + message.author.id + "> !!!!!11!!");
        return "{hax:5}"
    }
}
module.exports = {
    type:"datastore test",
    hided:true,
    description:"saves data",
    async execute(message, args, discord, db) {
        args = args.join(" ")
        db.set("key", args).then(() => {
            message.channel.send("**Message saved to database: **"+args)
        });
    }
}
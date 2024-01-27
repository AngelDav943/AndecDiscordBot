module.exports = {
    type:"datastore test",
    hidden:true,
    description:"saves data",

    perms: "botcreator",
    
    async execute(message, args, discord, db) {
        args = args.join(" ")
        console.log("db:",db["set"])
        db.set("key", args).then(() => {
            message.channel.send("**Message saved to database: **"+args)
        });
    }
}
module.exports = {
    type:"datastore test",
    hidden:true,
    description:"Get data of a specified key",

    perms: "botcreator",
    
    async execute(message, args, discord, db) {
        console.log(args);
        db.get("key").then(value => {
            message.channel.send("**database: **"+ value );
        })
    }
}
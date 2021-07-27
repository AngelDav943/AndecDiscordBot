module.exports = {
    type:"datastore test",
    hided:true,
    description:"Get data of a specified key",
    async execute(message, args, discord, db) {
        console.log(args);
        db.get("key").then(value => {
            message.channel.send("**database: **"+ value );
        })
    }
}
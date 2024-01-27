module.exports = {
    type:"datastore test",
    hidden:true,
    description:"gets all the keys of database (Only bot owner can access) ",
	perms:"botcreator",
    async execute(message, args, discord, db) {
        db.list().then(keys => {
            console.log(keys)
            message.channel.send("**database keys: **"+ keys )
        });
    }
}
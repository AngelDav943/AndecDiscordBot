module.exports = {
    type:"datastore test",
    hidden:true,
    description:"Deletes a key from the database",

    perms: "botcreator",
    
    async execute(message, args, discord, db) {
        if (message.author.id == 356115020721029132) {
            let textargs = args
            textargs = textargs.join(" ")
            db.delete(textargs).then(() => {
                message.channel.send("Key *"+textargs+"* got deleted from **database**")
            });
        }
    }
}
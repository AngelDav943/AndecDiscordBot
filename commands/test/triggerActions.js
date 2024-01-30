module.exports = {
    type:"",
    hidden:true,
    perms: "botcreator",
    description:"",
    async execute(message, args, discord, client) {
        const actions = require(__dirname+"/../../actions/actions.js")
        actions.execute(discord, client);
    }
}
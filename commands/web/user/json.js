let fetch = require('node-fetch');

module.exports = {
    type:"",
    hidden:false,
    perms:"",
    description:"This command can give you user data from the https://angeldc943.repl.co webiste",

    perms: "botcreator",
    
    async execute(message, args, discord) {
        let fetch_url = 'https://angeldc943.repl.co/api/users/get'
        message.channel.send("Showing json data of user with id: "+args[1])

        const response = await fetch(fetch_url);
        const data = await response.json();

        let user = data[args[1]-1]
        if (user) {
            message.channel.send(JSON.stringify(user));
        } else {
            message.channel.send("User not found!")
        }
    }
}
let fetch = require('node-fetch');

module.exports = {
    type:"",
    hided:false,
    perms:"",
    description:"This command can give you user data from the https://angeldc943.repl.co webiste",
    async execute(message, args, discord) {
        let fetch_url = 'https://angeldc943.repl.co/api/users/get'
        message.channel.send("Showing data of user with id: "+args[1])

        const response = await fetch(fetch_url);
        const data = await response.json();

        let user = data[args[1]-1]
        if (user) {
            var MessageEmbed = new discord.MessageEmbed()
                .setTitle(`***${user.displayname}*** @${user.name}`)
                .setDescription(`Description: ${user.description.replace(/<br>/g,"\n")} \n\n`+
                    `Badges: ${JSON.stringify(user.badges)} \n`+
                    `Banned: ${user.banned} \n`+
                    `ID: ${user.id+1}`
                )
                .setThumbnail(
                    'https://angeldc943.repl.co/assets/images/userprofiles/'+(user.id+1)+'.png'
                );

            message.channel.send(MessageEmbed);
        } else {
            message.channel.send("User not found!")
        }
    }
}
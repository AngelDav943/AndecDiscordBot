let fetch = require('node-fetch')

module.exports = {
    type:"test",
    hided:true,
    perms:"default",
    description:"",
    async execute(message, args) {
        let fetch_url = "https://AndecDiscordBot-Handler-1.angeldc943.repl.co/getRandMessage"

        let response = await fetch(fetch_url);
        let data = await response.json();

        console.log(data)

        /*(url).then(res => {
            res.json().then(data => {
                console.log(JSON.stringify(data))
                //message.channel.send(JSON.stringify(data))
            });
        })*/
    }
}
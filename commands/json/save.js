const fs = require("fs")

module.exports = {
    type:"test",
    hidden:true,
    description:"just a test",
    async execute(message, args) {
        const fileData = fs.readFileSync('data/users.json', {encoding: 'utf8'})
        var parsedData = JSON.parse(fileData)

        var sentMessage = args.slice(1)
        var key = sentMessage.shift()
        var value = sentMessage.join(" ")
        
        console.log(String(key).length)
        console.log(value == "")

        if (String(key).length >= 75) return message.channel.send("Error saving: the key name is too long")
        if (String(value).length >= 75) return message.channel.send("Error saving: the key's value is too long")
        
        if (value == "") {
            value = key
            key = "key"
        }

        parsedData[key] = value
        
        const stringifiedData = JSON.stringify(parsedData);
        fs.writeFile('data/users.json', stringifiedData, 'utf8', (err) => {
            if (err) return message.channel.send(`Error writing file: ${err}`);
            message.channel.send(`File is written successfully!`);
        });
    }
}
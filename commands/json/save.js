const fs = require("fs")

module.exports = {
    type:"test",
    hided:true,
    description:"just a test",
    async execute(message, args) {
        let user = {
            "test123#1234": {
                rblxname: 'test999'
            }
        };

        const data = JSON.stringify(user);
        fs.writeFile('data/users.json', data, 'utf8', (err) => {
            if (err) {
                message.channel.send(`Error writing file: ${err}`);
            } else {
                message.channel.send(`File is written successfully!`);
            }

        });
    }
}
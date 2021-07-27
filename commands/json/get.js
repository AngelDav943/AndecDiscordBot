const fs = require("fs")

module.exports = {
    type:"test",
    hided:true,
    description:"just a test",
	perms:"botcreator",
    async execute(message, args) {
		/*fs.readFile('data/users.json', 'utf8', (err, data) => {
			if (err) return message.channel.send("**Error: **"+err)

			// parse JSON string to JSON object
			const databases = JSON.parse(data);

			// print all databases
			databases.forEach(db => {
				message.channel.send(`${db.name}: ${db.type}`);
			});
		})*/
    }
}
module.exports = {
    perms:"botcreator",
    description:"Checks the server cache",
    async execute(message, args) {
        console.log(require.cache)
    }
}
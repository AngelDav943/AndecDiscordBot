module.exports = {
    perms:"botcreator",
    description:"Checks the server cache",
    async execute(message, args) {
        Object.keys(require.cache).forEach(key => { 
            delete require.cache[key]
        })
        console.log('CACHE CLEARED')
        message.channel.send('cache cleared.')
    }
}
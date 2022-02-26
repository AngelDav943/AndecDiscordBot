module.exports = {
    perms:"botcreator",
    description:"Clears the bot's cache",
    async execute(message, args) {
        Object.keys(require.cache).forEach(key => { 
            delete require.cache[key]
        })
        console.log('CACHE CLEARED')
        message.channel.send('cache cleared.')
    }
}
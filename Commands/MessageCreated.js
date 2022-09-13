const { ban, warn, removeWarn, getNumberWarn } = require("./Moderation") 
const { addAMessage, getRank, getProfil } = require("./Level")
const suggestion = require("./suggestions")

const messageCreated = (message) => {
    if(message.author.bot) return
    if(message.content.startsWith("/")) {
        const commandTitle = message.content.split(" ")[0].split("/")[1]

        if(commandTitle == 'ban') ban(message)
        if(commandTitle == 'rank') getRank()
        if(commandTitle == 'suggestion') suggestion(message)  
        if(commandTitle == 'warn') warn(message)
        if(commandTitle == 'rmWarn') removeWarn(message)
        if(commandTitle == 'getWarn') getNumberWarn(message)
        if(commandTitle === 'profil') getProfil(message)
    } else addAMessage(message)
}   

module.exports = messageCreated
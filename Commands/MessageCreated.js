const { ban } = require("./Moderation") 

const { addAMessage, getRank } = require("./Level")

const messageCreated = (message) => {
    if(message.author.bot) return
    if(message.content.startsWith("e3b.")) {
        const commandTitle = message.content.split(" ")[0].split("e3b.")[1]

        if(commandTitle == 'ban') ban(message)
        if(commandTitle == 'rank') getRank() 
    } else addAMessage(message)
}   

module.exports = messageCreated
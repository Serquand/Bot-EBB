const config = require("../config.json").dev
const { getAllMessageOfAChannel, checkFreezeBetweenCommand } = require("./Utils")

const latestMessageOf = (allMessages, user) => {
    let messagesOf = new Array(0)
    allMessages.forEach(message => {
        if(message.author.id === user) messagesOf.push(message)
    })
    messagesOf.shift()
    return messagesOf.shift()
}

const suggestions = async (message) => {
    let coolDownOk = checkFreezeBetweenCommand(latestMessageOf(await getAllMessageOfAChannel(message.channelId, message.guild), message.author.id)) 
    
    if(typeof(coolDownOk) == "number") {
        coolDownOk = parseInt(coolDownOk / 1000)
        return message.reply("Vous pourrez faire une prochaine suggestion dans " + parseInt(coolDownOk / 60) + " minutes et " + (coolDownOk % 60) + " secondes !")
    }

    const suggestionChannel = message.guild.channels.cache.find(channel => channel.id === config.suggestionRoom)
    let suggestion = message.content.split(" ")
    suggestion.shift()
    suggestion = suggestion.join(" ")
    suggestionChannel.send("<@" + message.author.id + "> a fait la suggestion : \n" + suggestion)
}

module.exports = suggestions
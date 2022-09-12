const config = require("../config.json").dev

const getAllMessageOfAChannel = async (channelId, guild) => {
    const channel = guild.channels.cache.find(channel => channel.id === channelId)
    const allMessage = await channel.messages.fetch()
    return allMessage
}

const checkFreezeBetweenCommand = (lastMessage) => {
    if(lastMessage == undefined) return true
    const oldTimestamp = lastMessage.createdTimestamp, newTimestamp = Date.now()
    const differenceTs = newTimestamp - oldTimestamp  
    const isOkay = config.coolDownCmd - differenceTs
    if(isOkay > 0) return isOkay
    return true;
}  

module.exports = { getAllMessageOfAChannel, checkFreezeBetweenCommand }
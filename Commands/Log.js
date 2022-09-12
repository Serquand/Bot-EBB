let config = require("../config.json").dev

const handleArrivalMember = (information) => {
    const logChannel = information.guild.channels.cache.find(channel => channel.id === config.logChannel)
    const user = information.guild.members.cache.find(member => member.id === information.user.id)
    const clocheRole = information.guild.roles.cache.find(role => role.id === config.clocheRole)
    const thRole = information.guild.roles.cache.find(role => role.id === config.th)
    user.roles.add(clocheRole)
    user.roles.add(thRole)
    logChannel.send("Un nouvel utilisateur vient juste d'arriver : " + information.user.username)
}

const guildMemberRemove = member => {
    const logChannel = member.guild.channels.cache.find(channel => channel.id === config.logChannel)
    logChannel.send("Un nouvel utilisateur vient juste de partir : " + member.user.username)
}

const voiceUpdateLogger = (oldState, newState) => {
    const logChannel = oldState.guild.channels.cache.find(channel => channel.id === config.logChannel)
    const user = oldState.member.user.username
    let message;
    if(newState.channelId == null) message = user + " vient juste de quitter le vocal " + oldState.guild.channels.cache.find(channel => channel.id === oldState.channelId).name
    else if(oldState.channelId != null) {
        const oldVocal = oldState.guild.channels.cache.find(channel => channel.id === oldState.channelId)
        const newVocal = newState.guild.channels.cache.find(channel => channel.id === newState.channelId)
        message = user + " vient juste de changer de vocal " + oldVocal.name + " -> " + newVocal.name
    } else message = user + " vient juste d'arriver en vocal " + newState.guild.channels.cache.find(channel => channel.id === newState.channelId).name
    logChannel.send(message)
}

const messageUpdateLogger = (oldMessage, newMessage) => {
    const oldContent = oldMessage.content
    const newContent = newMessage.content 
    const author = oldMessage.author.id
    const channel = oldMessage.channelId
    const logChannel = oldMessage.guild.channels.cache.find(channel => channel.id === config.logChannel)
    logChannel.send(
        "<@" + author + "> a modifié un message dans le salon <#" + channel + 
        ">.\n\nAncien message : \n" + oldContent + "\n\nNouveau message : \n" + newContent 
    )
}

const messageDeleteLogger = message => {
    const channel = message.channelId
    const logChannel = message.guild.channels.cache.find(channel => channel.id === config.logChannel)
    const contentessage = message.content 
    const author = message.author.id
    logChannel.send("Message supprimé : \nAuteur : <@" + author + ">.\nSalon : <#" + channel + ">.\nContenu : " + contentessage)
}

const banLogger = (message, member) => {
    const channelLog = message.guild.channels.cache.find(channel => channel.id === message.channelId)
    const username = message.guild.members.cache.find(user => user.id == member)
    channelLog.send("<@" + username.user.id + ">" + " a bien été banni !")
} 

const warnLogger = (message, member, nbWarn) => {
    const channelLog = message.guild.channels.cache.find(channel => channel.id === message.channelId)
    const username = message.guild.members.cache.find(user => user.id == member)
    let endSentence = nbWarn == 1 ? '1er warn !' : nbWarn + 'ème warn !' 
    channelLog.send("<@" + username.user.id + ">" + " a bien été warn ! C'est son " + endSentence);
}
        

module.exports = { 
    handleArrivalMember, 
    guildMemberRemove, 
    voiceUpdateLogger, 
    messageUpdateLogger, 
    messageDeleteLogger, 
    banLogger, 
    warnLogger
}
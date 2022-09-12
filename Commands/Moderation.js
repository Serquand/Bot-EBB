const config = require("../config.json").dev

const isAStaff = async user => await user.roles.cache.has(config.moderationRole)

const ban = async message => {
    const guild = message.guild
    const membersBan = message.content.split('<@')
    if(!await isAStaff(message.guild.members.cache.find(user => user.id === message.author.id) || membersBan.length == 1)) return; 
    for(let i = 1; i < membersBan.length; i++) guild.members.cache.find(user => user.id == membersBan[i].split(">")[0]).ban()
}

module.exports = { ban }
const config = require("../config.json").dev
const { banLogger, warnLogger, warnRemoveLogger, getWarnLogger } = require("./Log")
const User = require("../Models/User")

const isAStaff = async user => await user.roles.cache.has(config.moderationRole)

const ban = async message => {
    const guild = message.guild
    const membersBan = message.content.split('<@')
    if(!await isAStaff(message.guild.members.cache.find(user => user.id === message.author.id) || membersBan.length == 1)) return; 

    for(let i = 1; i < membersBan.length; i++) {
        const member = membersBan[i].split(">")[0]
        guild.members.cache.find(user => user.id == member).ban()
        banLogger(message, member)
    }

}

const warn = async message => {
    const membersWarn = message.content.split('<@')
    if(!await isAStaff(message.guild.members.cache.find(user => user.id === message.author.id) || membersWarn.length == 1)) return; 

    for(let i = 1;  i < membersWarn.length; i++) {
        const member = membersWarn[i].split(">")[0]
        const pseudo = message.guild.members.cache.find(user => user.id == member).user.username
        const user = await User.findOne({ where: { id: member } })
        
        if(user === null) {
            await User.create({ id: member, pseudo, nbWarn: 1 })
            warnLogger(message, member, 1)
        } else {
            await User.increment({ nbWarn: 1 }, { where: { id: member }})
            warnLogger(message, member, user.dataValues.nbWarn + 1)
        }
    }
}

const removeWarn = async message => {
    const membersWarn = message.content.split('<@')
    if(!await isAStaff(message.guild.members.cache.find(user => user.id === message.author.id) || membersWarn.length == 1)) return; 

    for(let i = 1;  i < membersWarn.length; i++) {
        const member = membersWarn[i].split(">")[0]
        const user = await User.findOne({ where: { id: member } })
        if(user === null || user.dataValues.nbWarn === 0)
            return message.reply("Ce membre n'a aucun warn et nous ne pouvons donc pas appliquer cette commande !")
        
        await User.increment({ nbWarn: -1 }, { where: { id: member }})
        warnRemoveLogger(message, member, user.dataValues.nbWarn - 1)
    }
}

const getNumberWarn = async message => {
    const membersWarn = message.content.split('<@')
    if(!await isAStaff(message.guild.members.cache.find(user => user.id === message.author.id) || membersWarn.length == 1)) return; 

    for(let i = 1; i < membersWarn.length; i++) {
        const member = membersWarn[i].split(">")[0]
        const user = await User.findOne({ where: { id: member } })
        if(user === null) return getWarnLogger(message, member, 0)
        getWarnLogger(message, member, user.dataValues.nbWarn)
    }   
}

module.exports = { ban, warn, removeWarn, getNumberWarn }
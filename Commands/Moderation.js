const config = require("../config.json").dev
const { banLogger, warnLogger } = require("./Log")
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
        let nbWarn
        const user = await User.findOne({ where: { id: member } })
        
        if(user === null) {
            await User.create({ id: member, pseudo, nbWarn: 1 })
            nbWarn = 1
        } else {
            await User.increment({ nbWarn: 1 }, { where: { id: member }})
            nbWarn = user.dataValues.nbWarn + 1;
        }
        warnLogger(message, member, nbWarn)
    }
}

module.exports = { ban, warn }
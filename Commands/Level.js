const User = require("../Models/User")
const { logLevelUpdated } = require("./Log")

const addAMessage = async (message) => {
    // On récupère les données : username + experience gagnée
    const idUser = message.author.id
    const pseudo = message.author.username
    const experience = Math.floor(Math.random() * 4) + 1

    //On s'assure que la personne existe bien en DB
    const user = await User.findAndCountAll({ where: { id: idUser } })   

    // On fait l'action  
    if(user.count == 0) await User.create({ id: idUser, pseudo, nbMessage: 1, experience })
    else {
        await User.increment({ nbMessage: 1, experience }, { where: { id: idUser } })
        const newLevel = checkLevelUpdate(user.rows[0].dataValues.experience, experience)
        if(newLevel) logLevelUpdated(message, message.author.id, newLevel)
    }
}

const checkLevelUpdate = (experience, gain) => {
    const newExperience = experience + gain
    for(let i = 0; ; i++) {
        const experienceLevel = getExperienceForLevel(i)
        if(experienceLevel > experience) {
            if(newExperience > experienceLevel) return i
            return 0
        }
    }
}

const getExperienceForLevel = level => 10 * Math.floor(Math.pow(level, 7/4))

const getRank = async () => {
    const totalRank = await User.findAll({
        order: [
            ['experience', 'DESC']
        ], 
        attributes: ['pseudo', 'nbMessage', 'experience']
    })
    for(let i = 0; i < totalRank.length; i++) totalRank[i] = totalRank[i].dataValues

    console.log(totalRank);
}

const getLevel = experience => {
    for(let i = 0; ; i++) {
        if(getExperienceForLevel(i) > experience) return i
    }
}

const getProfil = async message => {
    const authorId = message.author.id

    let experienceAndMessage = (await User.findOne({
        where: { id: authorId }, 
        attributes: ['nbMessage', 'experience']
    })).dataValues
    experienceAndMessage.level = getLevel(experienceAndMessage.experience)
    message.channel.send(
        "<@" + authorId + "> a " + experienceAndMessage.level + "niveau " + experienceAndMessage.nbMessage + " messages " + 
        experienceAndMessage.experience + " expériences ! Le prochain niveau est à " + getExperienceForLevel(experienceAndMessage.level)
    );
}   

module.exports = { addAMessage, getRank, getProfil } 
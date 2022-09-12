const User = require("../Models/User")

const addAMessage = async (message) => {
    // On récupère les données : username + experience gagnée
    const idUser = message.author.id
    const pseudo = message.author.username
    const experience = Math.floor(Math.random() * 4) + 1

    //On s'assure que la personne existe bien en DB
    const { count } = await User.findAndCountAll({ where: { id: idUser } })   
    
    // On fait l'action  
    if(count == 0) await User.create({ id: idUser, pseudo, nbMessage: 1, experience })
    else await User.increment({ nbMessage: 1, experience }, { where: { id: idUser } })
}

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

module.exports = { addAMessage, getRank } 
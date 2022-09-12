const User = require("../Models/User")

const addAMessage = async (message) => {
    // On récupère les données : username + experience gagnée
    const pseudo = message.author.username
    const experience = Math.floor(Math.random() * 4) + 1

    //On s'assure que la personne existe bien en DB
    const { count } = await User.findAndCountAll({ where: { pseudo } })   
    
    // On fait l'action  
    if(count == 0) await User.create({ pseudo, nbMessage: 1, experience })
    else {
        await User.increment({ nbMessage: 1 }, { where: { pseudo } })
        await User.increment({ experience }, { where: { pseudo } })
    }
}



module.exports = { addAMessage} 
import { MessageEmbed } from "discord.js";
import User from "../../Models/User";
import checkLevelUpdate from "./checkLevelUpdate";


export default async (message: any) => {
    const idUser = message.author.id;
    const pseudo = message.author.username;
    const discriminator = message.author.discriminator;
    const experience = Math.floor(Math.random() * 4) + 1;
    
    const user = await User.findAndCountAll({ where: { id: idUser } })   
    
    if(user.count == 0) await User.create({ id: idUser, pseudo, nbMessage: 1, experience })
    else {
        await User.increment({ nbMessage: 1, experience }, { where: { id: idUser } })
        const newLevel = checkLevelUpdate(user.rows[0].dataValues.experience, experience)
        if(newLevel) {
            const embed: MessageEmbed = new MessageEmbed();
            embed.setTitle("Nouveau niveau");
            embed.setColor("RED");

            embed.addFields({
                name: pseudo + "#" + discriminator,
                value: "Félicitations " + pseudo + "#" + discriminator + ", vous avez atteint le niveau " + newLevel
            })
        }
    }    
}
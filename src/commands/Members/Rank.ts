import { MessageEmbed } from "discord.js";
import User from "../../Models/User"
import getLevelFromXP from "../../utils/Level/GetLevelFromXP";

module.exports = {
    name: 'rank',
    description: "Display the level information of a member",
    options: [
        {
            name: "user",
            description: "Taper l'ID de l'utilisateur",
            type: "STRING",
            required: true,
            autocomplete: false,
        }
    ],

    runSlash: async (client: any, interaction: any) => {
        const memberId = interaction.options.getString("user");
        const user = interaction.guild.members.cache.find((user: any) => user.id == memberId).user;
        const pseudo = user.username;
        const discriminator = user.discriminator
        let pos, xpUser;

        // Search info in the database
        const totalRank = await User.findAll({
            order: [['experience', 'DESC']], 
            attributes: ["id", 'pseudo', 'experience']
        })
        for(let i = 0; i < totalRank.length; i++) {
            const userRank = totalRank[i].dataValues
            if(userRank.id != user.id) continue;

            pos = i + 1;
            xpUser = userRank.experience;

            break;
        }

        // Convert info
        const actualLevel = getLevelFromXP(xpUser);
        const nextStep = 10 * Math.floor(Math.pow(actualLevel + 1, 2.5))

        // Create the embed
        const embed: MessageEmbed = new MessageEmbed();
        
        embed.setTitle(pseudo + "#" + discriminator);
        embed.setColor("RED");
        embed.setThumbnail(user.displayAvatarURL());
        embed.addFields(
            { name: "Actuel", value: "Niveau actuel: " + actualLevel + "\nXP actuel: " + xpUser },
            { name: "Futur", value: "Prochain niveau: " + (actualLevel + 1) + "\nProchain XP : " + nextStep },
            { name: 'Rang actuel : ' + pos , value: "\u200b" }
        )

        // Send the embed
        interaction.reply({ embeds: [embed] })
    }
}
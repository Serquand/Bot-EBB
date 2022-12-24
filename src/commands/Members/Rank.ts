import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import User from "../../Models/User"

let view = 0;

const generateValue: Function = (ranking: any[]): string => {
    const size: number = 0;
    let output: string = "";

    for(let i = view * 10; i < view * 11; i++) {
        
    }
    
    return output;
}

module.exports = {
    name: 'ranking',
    description: "Display the ranking",

    runSlash: async (client: any, interaction: any) => {
        const totalRank = await User.findAll({
            order: [['experience', 'DESC']], 
            attributes: ['pseudo']
        });

        const embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Classement");
        embed.setColor("RED");
        embed.addFields({
            name: "\u200b",
            value: generateValue(totalRank)
        })

        const row: MessageActionRow = new MessageActionRow()
		row.addComponents(
            new MessageButton()
	            .setCustomId('Previous')
	            .setLabel('Précédent')
	            .setStyle("PRIMARY"),
              
            new MessageButton()
            	.setCustomId('Next')
            	.setLabel('Suivant')
            	.setStyle("PRIMARY"),
			);

        interaction.reply({ embeds: [embed], components: [row] });
    }
}
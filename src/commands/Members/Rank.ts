// import { MessageEmbed } from "discord.js";
// import User from "../../Models/User"

// module.exports = {
//     name: 'rank',
//     description: "Display the level information of a member",
//     options: [
//         {
//             name: "user",
//             description: "Taper l'ID de l'utilisateur",
//             type: "STRING",
//             required: true,
//             autocomplete: false,
//         }
//     ],

//     runSlash: async (client: any, interaction: any) => {
//         const memberId = interaction.options.getString("user");
//         const user = interaction.guild.members.cache.find((user: any) => user.id == memberId).user;
//         const pseudo = user.username;
//         const discriminator = user.discriminator

//         // Search info in the database
//         const totalRank = await User.findAll({
//             order: [['experience', 'DESC']], 
//             attributes: ['pseudo', 'experience']
//         })
//         for(let i = 0; i < totalRank.length; i++) totalRank[i] = totalRank[i].dataValues
    
//         console.log(totalRank);

//         // Convert info


//         // Create the embed
//         const embed: MessageEmbed = new MessageEmbed();
        
//         embed.setTitle(pseudo + "#" + discriminator);
//         embed.setColor("RED");
//         embed.setThumbnail(user.displayAvatarUrl());
//         embed.addFields(
//             { name: "Actuel", value: "Niveau actuel: \nXP actuel: " },
//             { name: "Futur", value: "Prochain niveau: \nProchain XP : " },
//             { name: 'Rang actuel', value: "5" }
//         )

//         // Send the embed
//         interaction.reply({ embeds: [embed] })
//     }
// }
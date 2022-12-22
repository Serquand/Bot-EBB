import { MessageEmbed } from "discord.js";

let membersWhoUses: string[] = [];

module.exports = {
    name: "suggestion", 
    description: "Faire une suggestion",
    options: [
        {
            name: "suggestion",
            description: "Notre suggestion",
            type: "STRING",
            required: true,
            autocomplete: false,
        }
    ],


    runSlash: async (client : any, interaction : any) => {
        const cooldown = 600_000;
        const userId = interaction.user.id

        // Check if the users can send the suggestion with the cooldown time
        if(membersWhoUses.indexOf(userId) != -1) {
            return interaction.reply({ 
                content: "Vous ne pouvez pas lancer cette commande à moins de 10 minutes d'intervalles !",
                ephemeral: true
            })
        }

        // Handle the cooldown time
        membersWhoUses.push(userId);

        setTimeout(() => {
            const index = membersWhoUses.indexOf(userId);
            membersWhoUses.splice(index, 1);
        }, cooldown);

        // Get the information about the suggestion
        const suggestionChannel = interaction.guild.channels.cache.find((channel: any) => channel.id === process.env.suggestionRoom)
        let suggestion = interaction.options.getString("suggestion");
        const suggester = interaction.user.username + "#" +   interaction.user.discriminator;

        // Create the embed
        const embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Nouvelle suggestion");
        embed.setColor("RED");
        embed.addFields({
            name: suggester,
            value: suggestion 
        })  

        
        // Send the embed and reply to the interaction
        interaction.reply({
            content: "Votre suggestion a bien été prise en compte", 
            ephemeral: true
        });

        suggestionChannel.send({ 
            content: "Nouvelle suggestion !",
            embeds: [embed]
        })
    }
}
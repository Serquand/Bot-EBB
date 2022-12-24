import searchEmbed from "../../utils/Embeds/SearchEmbed";
import { MessageActionRow } from "discord.js";
import acceptButton from "../../utils/components/acceptButton";

module.exports = {
    name: "delete_embed", 
    description: "Delete an embed",
    options: [
        {
            name: "commande",
            description: "Taper le titre de la commande",
            type: "STRING",
            required: true,
            autocomplete: false, 
        }
    ],

    runSlash: async (client: any, interaction: any) => {
        const title = await interaction.options.getString("commande");
        const embed = await searchEmbed(title, interaction);
    
        if(embed == null){
            return interaction.reply({
                content: "Aucun embed trouvé !", 
                ephemeral: true
            });
        } 

        const confirmEmbedDelete: MessageActionRow = new MessageActionRow();
        const deleteEmbedButton = acceptButton("Confirmer", "deleteEmbed");
        confirmEmbedDelete.addComponents(deleteEmbedButton);

        interaction.reply({
            embeds: [embed.embeds[0]], 
            components: [confirmEmbedDelete]
        });

        const filter = (i:  any) =>  i.customId === 'deleteEmbed' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async (interaction: any) => {
            collector.stop();   
            embed.delete();
            interaction.reply("L'embed a bien été supprimé ✅")
        });
    }    
}   
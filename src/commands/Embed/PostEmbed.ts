import searchEmbed from "../../utils/Embeds/SearchEmbed";

module.exports = {
    name: "post", 
    description: "Post an embed",
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

        interaction.reply({
            embeds: [embed]
        })
    }    
}   
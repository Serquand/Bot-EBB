import { MessageActionRow, Modal, TextInputComponent } from "discord.js";
import searchEmbed from "../../utils/Embeds/SearchEmbed";

module.exports = {
    name: "edit_embed",
    description: "Edit an embed",
    options: [
        {
            name: "embed",
            description: "Taper le titre de l'embed à modifier",
            type: "STRING",
            required: true,
            autocomplete: false,
        }
    ],

    runSlash: async (client: any, interaction: any) => {
        const embedTitle = interaction.options.getString("embed");
        const oldEmbed = (await searchEmbed(embedTitle, interaction));
        if(oldEmbed == null) {
            return interaction.reply("Nous n'avons pas trouvé cette commande custom !");
        }

        const modal: Modal = new Modal();
        modal.setCustomId("editEmbed-" + embedTitle);
        modal.setTitle("Modification d'embed - " + embedTitle);

        const titleInput: TextInputComponent = new TextInputComponent();
        titleInput.setCustomId("titleEmbed");
        titleInput.setStyle("SHORT");
        titleInput.setLabel("Title")
        const titleRow = new MessageActionRow<TextInputComponent>().addComponents(titleInput);

        const descriptionInput: TextInputComponent = new TextInputComponent();
        descriptionInput.setCustomId("descriptionEmbed");
        descriptionInput.setRequired(false);
        descriptionInput.setStyle("PARAGRAPH");
        descriptionInput.setLabel("Description");
        const descriptionRow = new MessageActionRow<TextInputComponent>().addComponents(descriptionInput);

        const footerInput: TextInputComponent = new TextInputComponent();
        footerInput.setCustomId("footerEmbed");
        footerInput.setRequired(false);
        footerInput.setStyle("SHORT");
        footerInput.setLabel("Footer");
        const footerRow = new MessageActionRow<TextInputComponent>().addComponents(footerInput);

        modal.addComponents(titleRow, descriptionRow, footerRow);

        await interaction.showModal(modal);
    }
}
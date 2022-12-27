import { Modal, TextInputComponent, MessageActionRow } from "discord.js";

module.exports = {
    name: "create_embed", 
    description: "Create an embed",
    runSlash: async (client: any, interaction: any) => {
        const modal: Modal = new Modal();
        modal.setCustomId("createEmbed");
        modal.setTitle("Create Embed");

        const titleInput: TextInputComponent = new TextInputComponent();
        titleInput.setCustomId("titleCreateEmbed");
        titleInput.setStyle("SHORT");
        titleInput.setLabel("Title")
        const titleRow = new MessageActionRow<TextInputComponent>().addComponents(titleInput);

        const descriptionInput: TextInputComponent = new TextInputComponent();
        descriptionInput.setCustomId("descriptionCreateEmbed");
        descriptionInput.setRequired(false);
        descriptionInput.setStyle("PARAGRAPH");
        descriptionInput.setLabel("Description");
        const descriptionRow = new MessageActionRow<TextInputComponent>().addComponents(descriptionInput);

        const footerInput: TextInputComponent = new TextInputComponent();
        footerInput.setCustomId("footerCreateEmbed");
        footerInput.setRequired(false);
        footerInput.setStyle("SHORT");
        footerInput.setLabel("Footer");
        const footerRow = new MessageActionRow<TextInputComponent>().addComponents(footerInput);

        modal.addComponents(titleRow, descriptionRow, footerRow);

        await interaction.showModal(modal);
    }
}
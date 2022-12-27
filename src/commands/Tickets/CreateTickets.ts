import { MessageActionRow, Modal, TextInputComponent } from "discord.js";

module.exports =  {
    name: "create_tickets",
    description: "Create a new ticket",

    async runSlash(client: any, interaction: any) {
        const modal: Modal = new Modal();
        modal.setCustomId("createTickets");
        modal.setTitle("Création de tickets");

        const titleInput: TextInputComponent = new TextInputComponent();
        titleInput.setCustomId("titleCreateTicket");
        titleInput.setStyle("SHORT");
        titleInput.setLabel("Title")
        const titleRow = new MessageActionRow<TextInputComponent>().addComponents(titleInput);

        const descriptionInput: TextInputComponent = new TextInputComponent();
        descriptionInput.setCustomId("descriptionCreateTicket");
        descriptionInput.setRequired(false);
        descriptionInput.setStyle("PARAGRAPH");
        descriptionInput.setLabel("Description");
        const descriptionRow = new MessageActionRow<TextInputComponent>().addComponents(descriptionInput);

        const footerInput: TextInputComponent = new TextInputComponent();
        footerInput.setCustomId("footerCreateTicket");
        footerInput.setRequired(false);
        footerInput.setStyle("SHORT");
        footerInput.setLabel("Footer");
        const footerRow = new MessageActionRow<TextInputComponent>().addComponents(footerInput);

        modal.addComponents(titleRow, descriptionRow, footerRow);

        await interaction.showModal(modal);
    }
}
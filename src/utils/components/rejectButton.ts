import { MessageButton } from "discord.js";

const rejectButton : (title: string, idButton: string) => MessageButton = (title: string, idButton: string) : MessageButton => {
    const button = new MessageButton();
    button.setCustomId(idButton);
    button.setLabel(title);
    button.setStyle("DANGER");


    return button;
}

export default rejectButton;
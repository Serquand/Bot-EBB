import { MessageButton } from "discord.js";

const acceptButton : (title: string, idButton: string) => MessageButton = (title: string, idButton: string) : MessageButton => {
    const button = new MessageButton();
    button.setCustomId(idButton);
    button.setLabel(title);
    button.setStyle("SUCCESS");

    return button;
}

export default acceptButton;
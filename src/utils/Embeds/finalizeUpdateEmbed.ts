import { MessageEmbed, Message } from "discord.js";

const finalizeUpdateEmbed: (message: Message, embed: MessageEmbed, title: string) => void = (message: Message, embed: MessageEmbed, title: string) => {
    message.delete();
    message.channel.send({
        content: title, 
        embeds: [embed]
    })
}   

export default finalizeUpdateEmbed;
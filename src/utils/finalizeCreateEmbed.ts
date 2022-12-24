import { Message, MessageEmbed } from "discord.js";

const finalizeCreateEmbed : (embed: MessageEmbed, title: string, message: Message) => void = (embed: MessageEmbed, title: string, message: Message) => {
    const embedStockChannel: any = message.guild?.channels.cache.find((channel: any) => channel.id === process.env.embedStockChannel)
    embedStockChannel?.send({
        content: title,
        embeds: [embed],
    })
}

export default finalizeCreateEmbed;
import { Channel, ChannelManager, MessageEmbed } from "discord.js";
import { NullLiteral } from "typescript";

const searchEmbed : (nameEmbed: string, message: any) => Promise<MessageEmbed | null> = async (nameEmbed: string, message: any) : Promise<MessageEmbed | null> =>  {
    const channel: any = message.guild.channels.cache.find((channel: any) => channel.id === process.env.embedStockChannel);
    const messages = await channel.messages.fetch();
    let messageReturn : MessageEmbed | null = null;

    messages.forEach((embed: any) => {        
        if(embed.content == nameEmbed) {
            messageReturn = embed.embeds[0]
        };
    });

    return messageReturn;
}   

export default searchEmbed;
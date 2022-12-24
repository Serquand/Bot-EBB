import { Message } from "discord.js";

const searchEmbed : (nameEmbed: string, message: any) => Promise<Message | null> = async (nameEmbed: string, message: any) : Promise<Message | null> =>  {
    const channel: any = message.guild.channels.cache.find((channel: any) => channel.id === process.env.embedStockChannel);
    const messages = await channel.messages.fetch();
    let messageReturn : Message | null = null;

    messages.forEach((embed: any) => {        
        if(embed.content == nameEmbed) {
            messageReturn = embed
        };
    });

    return messageReturn;
}   

export default searchEmbed;
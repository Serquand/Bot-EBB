import { MessageEmbed } from "discord.js";

module.exports = {
    name: "voiceStateUpdate", 
    once: false, 

    execute(client: any, oldState: any, newState: any) {       
        const logChannel = oldState.guild.channels.cache.find((channel: any) => channel.id === process.env.logChannel)
        const user = oldState.member.user.username;
        const oldVocalName = oldState.guild.channels.cache.find((channel: any) => channel.id === oldState.channelId)?.name
        const newVocalName = newState.guild.channels.cache.find((channel: any) => channel.id === newState.channelId)?.name
        
        const embed = new MessageEmbed();
        embed.setTitle("Nouvelle activité vocal !");
        embed.setColor("RED");

        if(newState.channelId == null) {
            embed.addFields({
                name: user, 
                value: user + " vient juste de quitter le vocal " + oldVocalName
            });
        } else if(oldState.channelId != null) {
            embed.addFields({
                name: user,
                value: user + " vient juste de changer de vocal " + oldVocalName + " -> " + newVocalName
            });
        } else {
            embed.addFields({
                name: user,
                value: user + " vient juste d'arriver en vocal " + newVocalName
            }); 
        }
        logChannel.send({ embeds: [embed] })
    }
}
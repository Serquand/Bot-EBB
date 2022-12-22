import { Channel, MessageEmbed } from "discord.js"

module.exports = {
    name: "guildMemberAdd", 
    once: false,

    async execute(client: any, member: any) {
        const embed: MessageEmbed = new MessageEmbed();
        embed.setColor("RED");
        embed.setTitle("Une personne vient d'arriver !");
        embed.setThumbnail(member.user.displayAvatarURL());
        embed.addFields({
            name: "\u200b",
            value:  member.user.username + " vient de quitter le serveur !\nNous sommes maintenant " + 
                    client.guilds.cache.get(process.env.idServ).memberCount
        });

        const logChannel = member.guild.channels.cache.find((channel: Channel) => channel.id === process.env.logChannel)
        logChannel.send({ embeds: [embed]  })
    }
}
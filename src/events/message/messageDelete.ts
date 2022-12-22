import { MessageEmbed } from "discord.js";

module.exports = {
    name: "messageDelete",
    once: false, 

    execute(client: any, message: any) {
        // Récupère les informations du message
        const logChannel = message.guild.channels.cache.find((channel: any) => channel.id === process.env.logChannel);
        const contentessage = message.content;
        const author = message.author.username + "#" + message.author.discriminator
        const channel = message.channel.name

        // Crée l'embed
        const embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Message supprimé");
        embed.setColor("RED");
        embed.addFields({
            name: "Message envoyé par " + author + " supprimé dans " + channel,
            value: contentessage
        })

        // Envoie l'embed
        logChannel.send({ embeds: [embed] });
    }
}
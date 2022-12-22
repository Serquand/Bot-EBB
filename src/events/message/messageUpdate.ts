import { Message, MessageEmbed } from "discord.js";

module.exports = {
    name: "messageUpdate",
    once: false, 

    execute(client: any, oldMessage: any, newMessage: any) {
        // Récupère les informations du message
        const oldContent = oldMessage.content
        const newContent = newMessage.content 
        const author = oldMessage.author.username + "#" + oldMessage.author.discriminator
        const channel = oldMessage.channel.name
        const logChannel = oldMessage.guild.channels.cache.find((channel: any) => channel.id === process.env.logChannel)

        // Crée l'embed
        const embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Message supprimé");
        embed.setColor("RED");
        embed.addFields({
            name: "Message envoyé par " + author + " modifié dans " + channel,
            value: "\u200b"
        });
        embed.addFields({
            name: "Ancien contenu :",
            value: oldContent
        });
        embed.addFields({
            name: "Nouvau contenu :",
            value: newContent
        });

        // Envoie l'embed
        logChannel.send({ embeds: [embed] });
    }
}
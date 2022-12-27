import { Guild, Interaction, MessageActionRow, MessageButton, MessageEmbed, Permissions, TextBasedChannel } from "discord.js";

const finalizeTicket: (client: any, embed: MessageEmbed, channel: TextBasedChannel, interaction: any) => any = (client: any, embed: MessageEmbed, channel: TextBasedChannel, interaction: any): any => {
    interaction.reply("Où voulez-vous envoyer le ticket ?")
    const collector = channel.createMessageCollector();
    
    const row = new MessageActionRow();

    const buttonPackages = new MessageButton();
    buttonPackages.setCustomId("button-packages");
    buttonPackages.setLabel("Packages");
    buttonPackages.setStyle("SUCCESS");

    const buttonRequest = new MessageButton();
    buttonRequest.setCustomId("button-request");
    buttonRequest.setLabel("Requests");
    buttonRequest.setStyle("PRIMARY");

    const buttonOthers = new MessageButton();
    buttonOthers.setCustomId("button-others");
    buttonOthers.setLabel("Others");
    buttonOthers.setStyle("SECONDARY");

    const buttonFinish = new MessageButton();
    buttonFinish.setCustomId("button-finish-request");
    buttonFinish.setLabel("Finish requests");
    buttonFinish.setStyle("DANGER");

    row.addComponents(buttonPackages, buttonRequest, buttonOthers, buttonFinish)

    collector.on("collect", async (message: any) => {
        if(message.author.bot) return;
        

        const channelId = message.content;
        const channel = await client.channels.fetch(channelId);

        if(!channel) return message.reply("Le channel n'existe pas ! Veuillez en entrer un valide !");

        collector.stop();
        const messageTickets = await channel.send({
            embeds: [embed],
            components: [row]
        })

        const ticketCollector = messageTickets.createMessageComponentCollector()    
        ticketCollector.on("collect", async (interaction: any) => {
            let channelName: string;
            console.log("TEST");
            if(interaction.customId === 'button-packages') {
                channelName = 'package-' + interaction.user.username
            } else if(interaction.customId === 'button-request') {
                channelName = 'request-' + interaction.user.username
            } else if(interaction.customId === 'button-others') {
                channelName = 'others-' + interaction.user.username
            } else if(interaction.customId === 'button-finish-request') {
                channelName = 'finish-' + interaction.user.username
            } else return;

            const user = interaction.user
            console.log(user.id);
            

            const guild = client.guilds.cache.get(process.env.idServ) as Guild;
            const channel = await guild.channels.create(channelName, { 
                type: 'GUILD_TEXT', 
                parent: client.channels.cache.get(process.env.categoryTicket),
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL]
                    }
                ] 
            });

            interaction.reply({
                content: "Votre ticket a bien été créé  ! ✅", 
                ephemeral: true
            })
        });

        message.reply("Le ticket a bien été créé ! ✅");
    })
}

export default finalizeTicket; 
import { Message, MessageActionRow, MessageCollector, MessageEmbed, ModalSubmitInteraction, TextBasedChannel } from "discord.js";
import acceptButton from "../../utils/components/acceptButton";
import rejectButton from "../../utils/components/rejectButton";
import finalizeUpdateEmbed from "./finalizeUpdateEmbed";
import searchEmbed from "./SearchEmbed";

type Field = {
    value: string;
    name: string;
}

const updateSecondStep : Function = async (interaction: ModalSubmitInteraction) => {
    const title = interaction.fields.getTextInputValue("titleEmbed");
    const footer = interaction.fields.getTextInputValue("footerEmbed");
    const description = interaction.fields.getTextInputValue("descriptionEmbed");
    const command = interaction.customId.split("-")[1];
    const oldMessage = (await searchEmbed(command, interaction))
    const oldEmbed = oldMessage?.embeds[0];

    const owner = interaction.user.id;
    let step = 0, fields: Field[] = [], image;

    // Création des différents boutons
    const addNewFields: MessageActionRow = new MessageActionRow()
	const endFields = rejectButton("Fin", "endFields");
    const notLastFields = acceptButton("Continuer", "notLastFields");
    addNewFields.addComponents(notLastFields, endFields);

    const confirmEmbedFields: MessageActionRow = new MessageActionRow();
    const deleteButton = rejectButton("Annuler", "cancelButton");
    const validButton = acceptButton("Valider", "validButton");
    confirmEmbedFields.addComponents(deleteButton, validButton);

    const noImage: MessageActionRow = new MessageActionRow();
    const noImageButton = rejectButton("Pas d'image", "noImageButton");
    noImage.addComponents(noImageButton)

    const answerCollector: MessageCollector = new MessageCollector(interaction.channel as TextBasedChannel);
    answerCollector.on("collect", async (message: Message) => {
        if(message.author.bot || owner !== message.author.id) return;
        if(message.content === "Cancel") return answerCollector.stop();
        
        if(step == 0) {
            if(message.content === "Continuer") {
                interaction.channel?.send("Entrez le titre du champ. Pour avoir un titre vide, entrez \\u200b");
                step = 1;
            } else if(message.content == "Envoyer") {
                const embed: MessageEmbed = new MessageEmbed();
                embed.setTitle(title);
                embed.setColor("RED");
                embed.setFooter({
                    text: footer
                });
                embed.setDescription(description);

                message.channel.send({
                    content: "Confirmez-vous la modification de cet embed :",
                    embeds: [oldEmbed as MessageEmbed, embed],
                    components: [confirmEmbedFields]
                })

                const filter = (i:  any) =>  (i.customId === 'validButton' || i.customId === 'cancelButton') && i.user.id === owner;
                const collector = message.channel.createMessageComponentCollector({ filter });

                collector.on('collect', async i => {
                    collector.stop();
                    answerCollector.stop();
	                if(i.customId == 'validButton') {
                        finalizeUpdateEmbed(oldMessage as Message, embed, title);
                        return i.reply("Nous avons bien modifié l'embed ! ✅");
                    } 
                    i.reply("Modification supprimée avec succès ! ✅");
                });
            } else {
                message.reply("Invalide, veuilez entrer **Envoyer** ou **Continuer**")
            }
            
            return
        }

        if(step == 1) {
            fields.push({ 
                name: message.content, 
                value: ""
            });
            interaction.channel?.send("Entrez le contenu du champ. Pour avoir un titre vide, entrez \\u200b");
            step = 2;
            
            return
        }

        if(step == 2) {
            fields[fields.length - 1].value = message.content;

            interaction.channel?.send({
                content: "Voulez-vous rajouter d'autres champs ?",
                components: [addNewFields]
            });

            const filter = (i:  any) =>  (i.customId === 'notLastFields' || i.customId === 'endFields') && i.user.id === owner;
            const collector = message.channel.createMessageComponentCollector({ filter });
            
            collector.on("collect", async i => {    
                collector.stop();
                if(i.customId !== 'notLastFields') {
                    step = 3;
                    i.reply({
                        content: "Insérez l'image à ajouter ou cliquez sur la réaction !",
                        components: [noImage]
                    })
                    
                    const filter = (i:  any) => i.customId === 'noImageButton' && i.user.id === owner;
                    const collector = message.channel.createMessageComponentCollector({ filter });
                    collector.on("collect", async i => {
                        const embed: MessageEmbed = new MessageEmbed();
                        embed.setTitle(title);
                        embed.setColor("RED");
                        embed.setFooter({
                            text: footer
                        });
                        embed.setDescription(description);
                        embed.addFields(...fields)
        
                        message.channel.send({
                            content: "Confirmez-vous la modification de cet embed :",
                            embeds: [oldEmbed as MessageEmbed, embed],
                            components: [confirmEmbedFields]
                        })
        
                        const filter = (i:  any) =>  (i.customId === 'validButton' || i.customId === 'cancelButton') && i.user.id === owner;
                        const collector = message.channel.createMessageComponentCollector({ filter });
        
                        collector.on('collect', async i => {
                            collector.stop();
                            answerCollector.stop();
                            if(i.customId == 'validButton') {
                                finalizeUpdateEmbed(oldMessage as Message, embed, title);
                                return i.reply("Nous avons bien modifié l'embed ! ✅");
                            } 
                            i.reply("Modification supprimée avec succès ! ✅");
                        });  
                    })
                } else  {
                    interaction.channel?.send("Entrez le titre du champ. Pour avoir un titre vide, entrez \\u200b");
                    step = 1;
                }
            })
            
            return
        }

        if(step == 3) {         
            const embed: MessageEmbed = new MessageEmbed();
            embed.setTitle(title);
            embed.setColor("RED");
            embed.setImage(message.attachments.first()?.attachment as string)
            embed.setFooter({
                text: footer
            });
            embed.setDescription(description);
            embed.addFields(...fields)

            message.channel.send({
                content: "Confirmez-vous la modification de cet embed :",
                embeds: [oldEmbed as MessageEmbed, embed],
                components: [confirmEmbedFields]
            })

            const filter = (i:  any) =>  (i.customId === 'validButton' || i.customId === 'cancelButton') && i.user.id === owner;
            const collector = message.channel.createMessageComponentCollector({ filter });

            collector.on('collect', async i => {
                collector.stop();
                answerCollector.stop();
                if(i.customId == 'validButton') {
                    finalizeUpdateEmbed(oldMessage as Message, embed, title);
                    return i.reply("Nous avons bien modifié l'embed ! ✅");
                } 
                i.reply("Modification supprimée avec succès ! ✅");
            });
        }   
    })
    

    interaction.reply(
        "Seconde partie de l'edit de l'embed." + 
        "\nSi vous voulez envoyer l'embed sans champ ni image, entrez **Envoyer**, sinon, entrez **Continuer**."+ 
        "\nSi vous voulez annuler la création, entrez **Cancel** à n'importe quel moment."
    )
}

export default updateSecondStep;
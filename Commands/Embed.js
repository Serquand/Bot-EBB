const MessageCollector = require("discord.js").MessageCollector
const MessageEmbed = require("discord.js").MessageEmbed;

const generateAndSubmitEmbed = async (answers, message) => {
    answers[1] = answers[1].split("#")[1].split(">")[0];
    message.reply("Voulez vous-envoyer ce message :")
    
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(answers[0])
        .setThumbnail('https://cdn.discordapp.com/attachments/974663242297270273/976801672150020126/pp_reseaux.png')

    for (i = 4; i < answers.length; i++) embed.addFields({ name: "\u200b", value: answers[i] })

    const confirmationMesage = await message.channel.send({ 
        embeds: [embed], 
        content: answers[3] + "\n" + answers[2]
    })

    await confirmationMesage.react("✅")
    await confirmationMesage.react("❌")

    const collector = confirmationMesage.createReactionCollector({ filter: (reaction, user) => user.id === message.author.id })
    collector.on("collect", async reaction => {
        if(reaction.emoji.name != "✅" && reaction.emoji.name != "❌") return 

        collector.stop() 
        
        if(reaction.emoji.name == "❌") return
        
        confirmationMesage.channel.guild.channels.cache.get(answers[1]).send({
            content: answers[3] + "\n" + answers[2], 
            embeds: [embed], 
        })

        deleteMessage(confirmationMesage.channel, answers.length + 10)

        const lastMessage = await confirmationMesage.channel.send("The message has been successfully sent !")
        lastMessage.react("✅")
    })
}

const deleteMessage = async (channel, numberOfMessage) => {
    const messages = await channel.messages.fetch()
    let count = 0;

    messages.forEach(msg => {
        count++
        if(count < numberOfMessage) msg.delete()
    })
}

const createEmbed = (message) => {
    const authorId = message.author.id
    const messageStep = [
        "Please, entrez le salon où envoyer le message.", 
        "Please, entrez le contenu additionnel du message.", 
        "Please, entrez le rôle à mentionner.", 
        "Please, entrez le contenu de l'embed. \nPour ajouter une nouvelle ligne, envoyer le message.\nPour finaliser le contenu, entrez \"Valider\"" 
    ]
    let step = 0, answers = [];

    message.reply("Vous allez entrer dans le mode de création d'un embed. Pour quitter, entrez \"Cancel\". \nPlease, entrez le titre du message.")
    const collector = new MessageCollector(message.channel);
    collector.on('collect', async (message) => {
        if(message.author.id !== authorId) return

        if(message.content === "Cancel" || (message.content == "Valider" && step == 4)) collector.stop()
        if(message.content === "Cancel") return step = 0;
        if(message.content == "Valider" && step == 4) return generateAndSubmitEmbed(answers, message)
        
        if(step != 4) {
            message.reply(messageStep[step])
            step++; 
        } else await message.react("✅")
        answers.push(message.content)
    })
}

const selectEmbed = async (answers, message) => {
    const channelId = answers[0].split("#")[1].split(">")[0]
    const channel = await message.channel.guild.channels.cache.get(channelId)
    const messages = await channel.messages.fetch()
    let deleteMessage

    messages.forEach(message => {
        if(message.embeds[0]?.title == answers[1]) deleteMessage = message
    })

    if(!deleteMessage) return { success: false, information: "No messages found !" }
    return { success: true, information: deleteMessage }
}

const deleteChosenEmbed = async (answers, message) => {
    const channelId = answers[0].split("#")[1].split(">")[0]
    const channel = await message.channel.guild.channels.cache.get(channelId)
    const messages = await channel.messages.fetch()

    messages.forEach(message => {
        if(message.embeds[0]?.title == answers[1]) message.delete()
    })
}

const deleteEmbed = (message) => {
    const authorId = message.author.id, messageStep = ["S'il vous plaît, entrez le titre de l'embed !"]
    let step = 0, answers = [];

    message.reply("Vous allez entrer dans le mode de suppression d'un embed. Pour quitter, entrez \"Cancel\". \nPlease, entrez le channel du message.")

    const collector = new MessageCollector(message.channel);
    collector.on('collect', async (message) => {
        if(message.author.id !== authorId) return

        if(message.content === "Cancel") {
            collector.stop();
            return 
        }

        answers.push(message.content)

        if(step == 1) {
            collector.stop()
            const choseDeleteMessage = await selectEmbed(answers, message);

            if(!choseDeleteMessage.success) {
                message.channel.send("No messages found !")
                return
            }   

            const confirmMessage = await message.reply({
                content: "Êtes-vous surs de vouloir supprimer le message suivant :", 
                embeds: choseDeleteMessage.information.embeds
            })
             

            await confirmMessage.react("✅")
            await confirmMessage.react("❌")

            const reactionCollector = confirmMessage.createReactionCollector({ filter: (reaction, user) => user.id === message.author.id })
            reactionCollector.on("collect", async reaction => {
                if(reaction.emoji.name != "✅" && reaction.emoji.name != "❌") return 
                reactionCollector.stop() 
                if(reaction.emoji.name == "❌") return

                await deleteChosenEmbed(answers, message)

                deleteMessage(confirmMessage.channel, 7)

                const lastMessage = await confirmMessage.channel.send("The message has been successfully deleted !")
                lastMessage.react("✅")
            })
        } else {
            message.reply(messageStep[step]);
            step++
        }
    })
}

const editEmbed = (message) => {
    const authorId = message.author.id, messageStep = [
        "S'il vous plaît, entrez le titre de l'embed !",
        "S'il vous plaît, entrez le nom après moification de l'embed", 
        "Please, entrez le contenu additionnel du message.", 
        "Please, entrez le rôle à mentionner.", 
        "Please, entrez le contenu de l'embed. \nPour ajouter une nouvelle ligne, envoyer le message.\nPour finaliser le contenu, entrez \"Valider\"" 
    ]
    let answers = [], step = 0 


    message.reply("Vous allez entrer dans le mode de modification d'un embed. Pour quitter, entrez \"Cancel\". \nPlease, entrez le channel du message.")

    const collector = new MessageCollector(message.channel);
    collector.on('collect', async (message) => {
        if(message.author.id !== authorId) return
        
        if(message.content === "Cancel" || (message.content == "Valider" && step == 4)) {
            collector.stop();
            return
        }

        if(message.content == "Valider" && step >= 6) message.channel.send("Test") 

        answers.push(message.content)

        if(step == 1) {
            const choseDeleteMessage = await selectEmbed(answers, message);
            if(!choseDeleteMessage.success) {
                collector.stop();
                message.channel.send("No messages found!")
                return
            } 

            const confirmMessage = await message.reply({
                content: "Êtes-vous sûr de vouloir modifier le message suivant :", 
                embeds: choseDeleteMessage.information.embeds
            })

            await confirmMessage.react("✅")
            await confirmMessage.react("❌")

            const reactionCollector = confirmMessage.createReactionCollector({ filter: (reaction, user) => user.id == message.author.id })
            reactionCollector.on("collect", async reaction => {
                if(reaction.emoji.name != "✅" && reaction.emoji.name != "❌") return 
                
                reactionCollector.stop()
                if(reaction.emoji.name == "❌") {
                    collector.stop()
                    message.channel.send("We won't update any message");
                    return
                }
                
                message.channel.send("S'il vous plaît, entrez le nom après moification de l'embed")
            })
        } else if(step != 6) message.reply(messageStep[step])
        else message.react("✅")

        step++
    })
}

module.exports = { createEmbed, deleteEmbed, editEmbed }
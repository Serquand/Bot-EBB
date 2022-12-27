import User from "../../Models/User"
import { MessageEmbed } from "discord.js";
import muteTemp from "../../utils/Moderation/MuteTemp";

module.exports = {
    name: "warn", 
    description: "Warn a member",
    options: [
        {
            name: "user",
            description: "Taper l'ID de l'utilisateur",
            type: "STRING",
            required: true,
            autocomplete: false,
        },
    ],

    runSlash: async (client : any, interaction : any) => {
        const memberWarn = interaction.options.getString("user");
        const pseudo = interaction.guild.members.cache.find((user: any) => user.id == memberWarn).user.username
        const user = await User.findOne({ where: { id: memberWarn } })
        const channels = interaction.guild.channels.cache.filter((channel: any) => true);
        let warn;

        if(user === null) {
            await User.create({ id: memberWarn, pseudo, nbWarn: 1 })
            warn = 1;
        } else {
            await User.increment({ nbWarn: 1 }, { where: { id: memberWarn }})
            warn = user.dataValues.nbWarn + 1;
        }

        const embed: MessageEmbed = new MessageEmbed();

        embed.setTitle('Confirmation de warn');
        embed.setColor("RED");

        if(warn == 3) {
            muteTemp(memberWarn, 60, channels);
            embed.addFields({ 
                name: "Nouveau warn", 
                value: pseudo + " a été ping ! C'est son 3e warn, et il est donc mute 1 h."
            });
        } else if(warn == 5) {
            muteTemp(memberWarn, 1440, channels); // 60 * 24 = 1440 minutes en 24 h
            embed.addFields({ 
                name: "Nouveau warn", 
                value: pseudo + " a été ping ! C'est son 5e warn, et il est donc mute 24 h."
            });
        } else if(warn == 7) {
            interaction.guild.members.cache.find((user: any) => user.id == memberWarn).user.kick();
            embed.addFields({ 
                name: "Nouveau warn", 
                value: pseudo + " a été ping ! C'est son 7e warn, et il est donc kick."
            });
        } else if (warn == 10) {
            interaction.guild.members.cache.find((user: any) => user.id == memberWarn).ban();
            embed.addFields({ 
                name: "Nouveau warn", 
                value: pseudo + " a été ping ! C'est son 10e warn, et il est donc ban."
            });
        } else {
            embed.addFields({ 
                name: "Nouveau warn", 
                value: pseudo + " a été ping ! C'est son " + warn + "e warn"
            });    
        }

        interaction.reply({ embeds: [embed] })
    },
}
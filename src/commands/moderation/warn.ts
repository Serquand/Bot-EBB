import User from "../../Models/User"
import { MessageEmbed } from "discord.js";

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
        embed.addFields({ 
            name: "Nouveau warn", 
            value: pseudo + " a été ping ! C'est son " + warn + "e warn"
        });

        interaction.reply({ embeds: [embed] })
    },
}
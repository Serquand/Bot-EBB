import User from "../../Models/User"
import { MessageEmbed } from "discord.js";

module.exports = {
    name: "ban", 
    description: "Ban a member",
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
        const guild = interaction.guild
        const memberBan = interaction.options.getString("user");
        const pseudo = interaction.guild.members.cache.find((user: any) => user.id == memberBan).user.username     

        guild.members.cache.find((user: any) => user.id == memberBan).ban()

        interaction.reply({ content: pseudo + " a bien été ban !", ephemeral: true })
    },
}
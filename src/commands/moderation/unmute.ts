import { Permissions } from "discord.js";
import unmuteUtil from "../../utils/Moderation/Unmute";

module.exports = {
    name: "unmute", 
    description: "Unmute an user",
    options: [
        {
            name: "user",
            description: "Taper l'ID de l'utilisateur à mute",
            type: "STRING",
            required: true,
        },
    ],

    runSlash: async (client : any, interaction : any) => {
        const guild = interaction.guild
        const userMute = interaction.options.getString("user");
        const user = guild.members.cache.find((user: any) => user.id == userMute)

        // Récupère les channels
        const channels = guild.channels.cache.filter((channel: any) => true);

       unmuteUtil(user, channels)

        interaction.reply("L'utilisateur <@" + userMute + "> a bien été unmute !")
    }
}
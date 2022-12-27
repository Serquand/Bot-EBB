import { Channel, Guild, Permissions } from "discord.js";

module.exports = {
    name: "mute", 
    description: "Mute an user",
    options: [
        {
            name: "user",
            description: "Taper l'ID de l'utilisateur à mute",
            type: "STRING",
            required: true,
        },
        {
            name: "duration",
            description: "Taper la durée du mute (en minutes) (optionnel pour infini)",
            type: "STRING",
            required: false,
        }
    ],

    runSlash: async (client : any, interaction : any) => {
        const guild = interaction.guild
        const userMute = interaction.options.getString("user");
        const user = guild.members.cache.find((user: any) => user.id == userMute)
        const timer = interaction.options.getString("duration");
        if(parseInt(timer) != timer && timer) interaction.reply("Durée invalide !");

        // Récupère les channels
        const channels = guild.channels.cache.filter((channel: any) => true);

        channels.forEach((channel: any) => {
            channel.permissionOverwrites.set([
                {
                    id: user, 
                    deny: [Permissions.FLAGS.SPEAK],
                },
                {
                    id: user, 
                    deny: [Permissions.FLAGS.SEND_MESSAGES],
                },
            ])
        });

        interaction.reply("L'utilisateur <@" + userMute + "> a bien été mute !")
    }
}
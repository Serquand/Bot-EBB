import User from "../../Models/User"

module.exports = {
    name: "get_warn", 
    description: "Get the number of warn of a member",
    options: [
        {
            name: "user",
            description: "Taper l'ID de l'utilisateur",
            type: "STRING",
            required: true,
            autocomplete: false,
        },
    ],

    runSlash: async (client: any, interaction: any) => {
        const memberWarn = interaction.options.getString("user");
        const pseudo = interaction.guild.members.cache.find((user: any) => user.id == memberWarn).user.username

        const user = await User.findOne({ where: { id: memberWarn } })
        if(user === null || user === undefined) {
            return interaction.reply({ content: "L'utilisateur n'existe pas ou a 0 warn !", ephemeral: true });
        }

        return interaction.reply({ content: pseudo + " a " + user.dataValues.nbWarn + " warn(s).", ephemeral: true });
    }
}
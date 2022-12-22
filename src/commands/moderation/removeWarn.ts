import User from "../../Models/User"

module.exports = {
    name: "remove_warn", 
    description: "Supprime un warn d'un utilisateur",
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
        const user = interaction.options.getString("user");
        
        const member = await User.findOne({ where: { id: user } })
        if(member === null || member.dataValues.nbWarn === 0) {
            return interaction.reply("Ce membre n'a aucun warn et nous ne pouvons donc pas appliquer cette commande !")
        }

        await User.increment({ nbWarn: -1 }, { where: { id: member }})
        
        interaction.reply(
            "Un warning a été enlevé au membre. Il ne lui reste plus que " + 
            (member.dataValues.nbWarn - 1) + " warnings !"
        );
    }
}
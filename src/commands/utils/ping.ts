import { Interaction } from "discord.js"

module.exports = {
    name: "ping", 
    description: "Test",
    
    runSlash: (client : any, interaction : any) => {
        interaction.reply({ content: 'Only you! :)', ephemeral: false });
    }
}
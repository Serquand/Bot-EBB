import { Guild, Interaction } from "discord.js";
import createTicketsSecondStep from "../../utils/Tickets/CreateTicketsSecondStep";
import createSecondStep from "../../utils/Embeds/CreateSecondStep"
import updateSecondStep from "../../utils/Embeds/updateSecondStep";

module.exports = {
    name: "interactionCreate", 
    once: false, 
    async execute(client: any, interaction: Interaction) {
        if(interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply("Cette commande n'existe pas");
            cmd.runSlash(client, interaction);
        }

        if(interaction.isModalSubmit()) {
            if(interaction.customId == "createEmbed") createSecondStep(interaction)
            if(interaction.customId == "createTickets") createTicketsSecondStep(client, interaction)
            if(interaction.customId.startsWith("editEmbed-")) updateSecondStep(interaction)
        }

        const devGuild: Guild = await client.guilds.cache.get(process.env.idServ);
        devGuild.commands.set(client.commands.map((cmd: any) => cmd))
    }
}
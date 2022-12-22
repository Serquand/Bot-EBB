module.exports = {
    name: "ready", 
    once: true, 
    async execute (client: any) {
        console.log("Bot launched !");

        const devGuild = client.guilds.cache.get(process.env.idServ as string);
        devGuild?.commands.set(client.commands.map((cmd: any) => cmd))
    }
}
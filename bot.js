require("dotenv").config()
const Discord = require("discord.js")
let config = require("./config.json").dev

const client = new Discord.Client({ intents: 32767 })

client.once("ready", () => {
    console.clear()
    console.log("Je suis lancé !")
})

// client.on("messageCreate", (message) => {
//     console.log("Test")
//     // message.channel.send("pong")
// })

client.on("guildMemberAdd", (information) => {
    const logChannel = information.guild.channels.cache.find(channel => channel.id === config.logChannel)
    const user = information.guild.members.cache.find(member => member.id === information.user.id)
    const clocheRole = information.guild.roles.cache.find(role => role.id === config.clocheRole)
    const thRole = information.guild.roles.cache.find(role => role.id === config.th)
    user.roles.add(clocheRole)
    user.roles.add(thRole)
    logChannel.send("Un nouvel utilisateur vient juste d'arriver : " + information.user.username)
})

client.on("guildMemberRemove", (message, member) => {
    console.log(member)
    console.log(message)
})

client.login(process.env.TOKEN)
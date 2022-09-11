require("dotenv").config()

const Discord = require("discord.js")

const client = new Discord.Client({ intents: 513 })

client.once("ready", () => {
    console.clear()
    console.log("Je suis lancé !")
})

client.on("messageCreate", (message) => {
    console.log("Test")
    // message.channel.send("pong")
})

client.on("guildMemberAdd", (message, member) => {
    console.log("Test")
})

client.login(process.env.TOKEN)
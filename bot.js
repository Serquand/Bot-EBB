require("dotenv").config()
const Discord = require("discord.js")
let config = require("./config.json").dev

const messageCreated = require("./Commands/MessageCreated")
const { handleArrivalMember, guildMemberRemove, voiceUpdateLogger, messageUpdateLogger, messageDeleteLogger } = require("./Commands/Moderation")

const client = new Discord.Client({ intents: 3276799 })

client.once("ready", () => {
    console.clear()
    console.log("Je suis lancé !")
})

client.on("messageCreate", message => messageCreated(message))
client.on("guildMemberAdd", information => handleArrivalMember(information))
client.on("guildMemberRemove", member => guildMemberRemove(member))
client.on("voiceStateUpdate", (oldState, newState) => voiceUpdateLogger(oldState, newState))
client.on("messageUpdate", message => messageUpdateLogger(message))
client.on("messageDelete", message => messageDeleteLogger(message))

client.login(process.env.TOKEN)
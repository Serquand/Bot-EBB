require("dotenv").config()
const Discord = require("discord.js")
let config = require("./config.json").dev

const messageCreated = require("./Commands/MessageCreated")
const { handleArrivalMember, guildMemberRemove, voiceUpdateLogger, messageUpdateLogger, messageDeleteLogger } = require("./Commands/Log")
const setup = require('./Models/Setup')


const client = new Discord.Client({ intents: 3276799 })

client.once("ready", async () => {
    await setup()
    console.clear()
    console.log("Je suis lancé !")
})

client.on("messageCreate", message => messageCreated(message))
client.on("guildMemberAdd", information => handleArrivalMember(information))
client.on("guildMemberRemove", member => guildMemberRemove(member))
client.on("voiceStateUpdate", (oldState, newState) => voiceUpdateLogger(oldState, newState))
client.on("messageUpdate", message => messageUpdateLogger(message))
client.on("messageDelete", message => messageDeleteLogger(message))
client.on("interactionCreate", information => {
    
})

client.login(process.env.TOKEN)
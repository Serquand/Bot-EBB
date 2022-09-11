const messageCreated = (message) => {
    if(message.author.bot) return
    if(message.content.startsWith("e3b.")) {
        const commandTitle = message.content.split(" ")[0].split("e3b.")[1]
        console.log(commandTitle)
    }
}   

module.exports = messageCreated
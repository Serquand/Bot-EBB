import cron from "node-cron";
import addExperience from "../../utils/Level/addExperience";

let members: any = {}, state = false;

module.exports = {
    name: "messageCreate",
    once: false, 

    async execute(client: any, message: any) {
        const MESSAGE_LIMIT = 10;
        const userId = message.author.id;
        
        if(state == false) {
            state = true;
            cron.schedule("* * * * *", () => members = {})
        }

        // Check if the message sent matches the expected rules of the channel

        // Check anti raid
        if(members[userId] == undefined) {
            members[userId] = 1;
            
            // Add experience
            addExperience(message);
        } else {
            members[userId]++;

            if(members[userId] > MESSAGE_LIMIT) {
                message.delete();
                message.channel.send("Attention, <@" + userId + ">, vous envoyez trop de messages !");
            }
        }
    }
}
import { Permissions } from "discord.js";

const unmuteUtil: (user: any, channels: any) => void = (user: any, channels: any): void => {
    channels.forEach((channel: any) => {
        channel.permissionOverwrites.set([
            {
                id: user, 
                allow: [Permissions.FLAGS.SPEAK],
            },
            {
                id: user, 
                allow: [Permissions.FLAGS.SEND_MESSAGES],
            },
        ])
    });
}

export default unmuteUtil;
import { Permissions } from "discord.js";

const muteUtil: (user: any, channels: any) => void = (user: any, channels: any): void => {
    channels.forEach((channel: any) => {
        channel.permissionOverwrites.set([
            {
                id: user, 
                deny: [Permissions.FLAGS.SPEAK],
            },
            {
                id: user, 
                deny: [Permissions.FLAGS.SEND_MESSAGES],
            },
        ])
    });
}

export default muteUtil;
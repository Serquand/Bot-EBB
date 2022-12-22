import { promisify } from "util";
import { glob } from "glob";
import { Client } from "discord.js";

const pGlob = promisify(glob);

export default async (client: Client) => {   
    (await pGlob(`${process.cwd()}/src/events/*/*.ts`)).map(async (eventFile: string) => {
        const event = require(eventFile);

        if(event.once == true) {
            client.once(event.name, (...args: any) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args: any) => event.execute(client, ...args));
        }
    })
}
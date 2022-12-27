import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection } from "discord.js";
import eventHandler from "./utils/handlers/EventUtils";
import commandHandler from "./utils/handlers/CommandUtil";
import setup from "./Models/Setup";

const client = new Client({ intents: 3276799 }) as any;
client.commands = new Collection()
client.login(process.env.TOKEN);

console.clear();

// setup();
eventHandler(client);
commandHandler(client);
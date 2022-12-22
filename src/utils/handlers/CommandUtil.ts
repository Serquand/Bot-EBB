import { promisify } from "util";
import { glob } from "glob";

const pGlob = promisify(glob);

export default async (client: any) => {
    console.log(await pGlob(`${process.cwd()}/src/commands/*/*.ts`));
    
    (await pGlob(`${process.cwd()}/src/commands/*/*.ts`)).map(async (cmdFile: string) => {
        const cmd = require(cmdFile);

        if(!cmd.name || !cmd.description) {
            return console.log("------\nCommande pas chargée : Pas de description ou de nom\n------")
        }
        
        client.commands.set(cmd.name, cmd);
        console.log("Commande chargée : ", cmd.name);
    })   
}
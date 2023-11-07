import ZeraClient from "./ZeraClient";
import { CommandBuild } from "./commands/builds/CommandBuild";

import execute from "exe";
import os from "os";
import fs from "fs/promises";
import MessageCreate from "./events/MessageCreate";
import Ready from "./events/Ready";

const client = new ZeraClient();

// Sorting everything in a class
export class App {
    private static ignored_folders = ["builds"];
    
    public static executePython(file: string) {
        if (os.platform() === "linux") {
            execute(`python ${file}`);
        } else if (os.platform() === "win32") {
            execute(`start bin/python/python.exe ${file}`);
        }
    }

    public static startEvents() {
        client.on("messageCreate", (message: null) => MessageCreate(client, message));
        client.once("ready", () => Ready(client));
    }

    public static async loadCommands() {
        fs.readdir("binaries/build/commands/").then(folders => 
            folders.forEach(folder => {
                if (!this.ignored_folders.includes(folder)) {
                    fs.readdir(`binaries/build/commands/${folder}/`).then(files => 
                        files.forEach(file => {
                            const CommandFile = require(`./commands/${folder}/${file}`);
                            const command = new CommandFile() as CommandBuild;
                            command.meta.names.forEach(name => client.commands.set(name, command));
                        }));
                }
            }));
    }
}

App.loadCommands().then(() => null);
App.startEvents();

client.connect();
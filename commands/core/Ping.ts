import Dysnomia from "@projectdysnomia/dysnomia";
import { CommandBuild, CommandDataBuild } from "../builds/CommandBuild";
import { ICommandContextData } from "../builds/CommandInterfaces";

export = class PingCommand extends CommandBuild {
    constructor() {
        super();
        
        this.meta = new CommandDataBuild({
            names: ["ping"],
            description: "ping the bot"
        });
    }
    
    public execute({ message }: ICommandContextData) {
        const now = Date.now();

        message.channel.createMessage(this.wrapper.createEmbed({ 
            description: "ping?" 
        })).then((msg: Dysnomia.Message) => {
            const diff = (Date.now() - now);
            msg.edit(this.wrapper.createEmbed({
                fields: [
                    { name: "Message Latency", value: `${diff}ms`, inline: true }
                ]
            }))
        })
    }
}
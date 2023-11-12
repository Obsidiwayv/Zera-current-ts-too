import { Colors, CommandBuild, CommandDataBuild } from "../builds/CommandBuild";
import { ICommandContextData } from "../builds/CommandInterfaces";

export = class Prefix extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["prefix"],
            description: "Updates the current guild prefix to what is specified",
            usage: "[prefix]",
            for: "MANAGER",
            argumentRequired: true
        });
    }
    
    public execute({ message, args }: ICommandContextData) {
        this.database.prefix.update({
            guid: this.guild.id,
            setting: args[0],
            // we parse this later
            lastChanged: Date.now().toString()
        });

        message.channel.createMessage(
            this.wrapper.createSucessEmbed(`Successfully updated prefix to \`${args[0]}\``));
    }
}
import { Colors, CommandBuild, CommandDataBuild } from "../builds/CommandBuild";
import { ICommandContextData } from "../builds/CommandInterfaces";

export = class Stats extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["stats", "st"],
            description: "Shows the bots current stats"
        });
    }
    
    public execute({ message }: ICommandContextData) {
        message.channel.createMessage(this.wrapper.createEmbed({
            description: `${this.client_user.username} created by ${this.config.dev_names["0"]} and ${this.config.dev_names["1"]}`,
            fields: [
                { name: "Colors", value: `There are currently \`${Object.keys(Colors).length}\` colors available`, inline: true },
                { name: "Guilds", value: `Operating on \`${this.client.guilds.size}\` servers/guilds`, inline: true },
                { name: "Users", value: `Protecting/Serving \`${this.client.users.size}\` users`, inline: true }
            ],
            color: this.wrapper.formatColorToHex(Colors["Pastel Purple"])
        }));
    }
}
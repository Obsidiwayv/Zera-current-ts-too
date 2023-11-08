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
    
    public execute({ message, client }: ICommandContextData) {
        message.channel.createMessage(this.wrapper.createEmbed({
            description: `${this.client_user.username} created by ${this.config.dev_names["0"]} and ${this.config.dev_names["1"]}`,
            fields: [
                { name: "Colors", value: `There are currently \`${Object.entries(Colors).length}\` colors available`, inline: true },
                { name: "Guilds", value: `Operating on \`${client.guilds.size}\` server/guilds`, inline: true },
                { name: "User", value: `Protecting/Serving \`${client.users.size}\` users`, inline: true }
            ],
            color: this.wrapper.formatColorToHex(Colors["Pastel Purple"])
        }));
    }
}
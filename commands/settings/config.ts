import { CommandBuild, CommandDataBuild } from "../builds/CommandBuild";
import { ICommandContextData } from "../builds/CommandInterfaces";

import ms from "ms";

export = class config extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["config", "guildconfig"],
            description: "Shows the current guild configurations"
        });
    }

    public async execute({ message }: ICommandContextData) {
        const prefix_config = await this.database.prefix.get(this.guild.id) || {
            setting: this.config.prefix,
            lastChanged: undefined
        };

        const prefix_date = ms(Date.now() - parseInt(prefix_config.lastChanged));

        message.channel.createMessage(this.wrapper.createEmbed({
            title: `Configurations for ${this.guild.name}`,
            fields: [{
                name: "Prefix",
                value: `current: \`${prefix_config.setting}\`${prefix_config.lastChanged === undefined ?
                    "" : `\nlast changed: \`${prefix_date} ago\``}`
            }]
        }));
    }
}
import { CommandBuild, CommandDataBuild } from "../builds/CommandBuild";

export = class Channel extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["channel"],
            description: "Changes the welcome/leave channel",
            argumentRequired: true,
            usage: "[type] [channel]"
        });
    }
}
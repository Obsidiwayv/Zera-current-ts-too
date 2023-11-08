import { ExtendedUser } from "@projectdysnomia/dysnomia";
import { CommandLevel, DevelopmentLevel, ICommandContextData, ICommandData } from "./CommandInterfaces";
import { CommandWrapper } from "./CommandWrapper";
import color_list from "./colors.json";
import { settings } from "../../config/JSONConfig";

export class CommandBuild {
    public meta: CommandDataBuild;
    public client_user: ExtendedUser;
    public config = settings;
    public wrapper = new CommandWrapper(color_list["Pastel Orange"]);
    public execute(ctx: ICommandContextData) {}
}

export class CommandDataBuild implements ICommandData {
    public constructor(data: ICommandData) {
        this.names = data.names;
        this.description = data.description;
        this.cooldown = data.cooldown || 2000;
        this.for = data.for || "USER";
        this.development = data.development || "BETA";
    }
    names: string[];
    description: string;
    cooldown?: number;
    for?: CommandLevel;
    development?: DevelopmentLevel;
}

export const Colors = color_list;
import { ExtendedUser, Guild, Message } from "@projectdysnomia/dysnomia";
import { CommandLevel, DevelopmentLevel, ICommandContextData, ICommandData } from "./CommandInterfaces";
import { CommandWrapper } from "./CommandWrapper";
import color_list from "./colors.json";
import { settings } from "../../config/JSONConfig";
import CommandResolveBuilder from "./CommandResolveBuilder";
import ZeraClient from "../../src/clients/ZeraClient";
import { SQL } from "../../database/SQL";

export class CommandBuild {
    public meta: CommandDataBuild;
    public client_user: ExtendedUser;
    public resolvers: CommandResolveBuilder;
    public client: ZeraClient;
    public guild: Guild;
    public config = settings;
    public wrapper = new CommandWrapper(color_list["Pastel Orange"]);
    public database = new SQL();
    public execute({ message, args }: ICommandContextData): any {}
}

export class CommandDataBuild implements ICommandData {
    public constructor(data: ICommandData) {
        this.names = data.names;
        this.description = data.description;
        this.usage = data.usage;
        this.cooldown = data.cooldown || 2000;
        this.for = data.for || "USER";
        this.development = data.development || "BETA";
        this.argumentRequired = data.argumentRequired || false;
    }
    names: string[];
    description: string;
    usage?: string;
    cooldown?: number;
    for?: CommandLevel;
    development?: DevelopmentLevel;
    argumentRequired?: boolean;
}

export const Colors = color_list;
import { CommandLevel, DevelopmentLevel, ICommandContextData, ICommandData } from "./CommandInterfaces";
import { CommandWrapper } from "./CommandWrapper";

export class CommandBuild {
    public meta: CommandDataBuild;
    public wrapper = new CommandWrapper(Colors.MistyRose);
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

export class Colors {
    public static MistyRose = 0xFFDFD3;
    public static PastelPink = 0xFC4C4;
    public static Periwinkle = 0xCBC7DD;
}
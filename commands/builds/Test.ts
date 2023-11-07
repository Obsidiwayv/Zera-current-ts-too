import { CommandBuild, CommandDataBuild } from "./CommandBuild";
import { ICommandContextData } from "./CommandInterfaces";

export class TestClass extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["test"],
            description: "no"
        });
    }
    
    public execute(ctx: ICommandContextData) {}
}
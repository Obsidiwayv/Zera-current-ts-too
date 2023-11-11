import { CommandBuild, CommandDataBuild } from "../builds/CommandBuild";
import { ICommandContextData } from "../builds/CommandInterfaces";
import { CommandWrapper } from "../builds/CommandWrapper";

export = class Avatar extends CommandBuild {
    public constructor() {
        super();

        this.meta = new CommandDataBuild({
            names: ["avatar", "av"],
            description: "Shows the avatar of a user/member"
        });
    }
    
    public execute({ message }: ICommandContextData) {
        const member = this.resolvers.getMember();

        message.channel.createMessage(member.dynamicAvatarURL("png"));
    }
}
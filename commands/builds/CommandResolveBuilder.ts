import Dysnomia from "@projectdysnomia/dysnomia";

export default class CommandResolveBuilder {
    public constructor(
        private message:Dysnomia.Message, 
        private guild: Dysnomia.Guild, 
        private args: string) {}

    public getMember() {
        var member: Dysnomia.Member;

        member = this.guild.members.find(i => i.id === this.ripSymbols(this.args)) ||
        this.guild.members.find(i => i.username === this.args);

        if (!member) {
            member = this.message.member;
        }

        return member;
    }

    public getChannel() {
        const channel = this.guild.channels.find(i => i.id === this.ripSymbols(this.args)) ||
        this.guild.channels.find(i => i.name === this.args);

        if (!channel) {
            return false;
        }

        return channel;
    }

    public getRole() {
        const role = this.guild.roles.find(i => i.id === this.ripSymbols(this.args)) ||
        this.guild.roles.find(i => i.name === this.args);

        if (!role) {
            return false;
        }

        return role;
    }

    private ripSymbols(arg: string) {
        return arg.replace("<", "")
        .replace("@", "")
        .replace("!", "")
        .replace(">", "")
        .replace("#", "");
    }
}
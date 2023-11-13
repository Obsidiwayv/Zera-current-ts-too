import { Constants, GuildChannel, Message } from "@projectdysnomia/dysnomia";
import ZeraClient from "../src/clients/ZeraClient";
import { settings } from "../config/JSONConfig";
import { ICommandContextData } from "../commands/builds/CommandInterfaces";
import { CommandWrapper } from "../commands/builds/CommandWrapper";
import { Colors } from "../commands/builds/CommandBuild";
import CommandResolveBuilder from "../commands/builds/CommandResolveBuilder";
import { SQL } from "../database/SQL";
import { MessageFormatter } from "../src/MessageFormatter";


export default async function (client: ZeraClient, message: Message) {
    const database = new SQL();

    if (message.author.bot) return;

    if (!(message.channel.type === Constants.ChannelTypes.GUILD_TEXT)) return;

    const guild = (<GuildChannel>message.channel).guild;

    const prefix = await database.prefix.get({ guid: guild.id }).then(val => {
        if (!val) return settings.prefix;
        return val.setting;
    });

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = client.commands.get(args[0]);

    try {
        if (command) {
            const wrapper = new CommandWrapper(Colors.Periwinkle);

            if (client.cooldowns.get(args[0] + message.author.id)) {
                return message.channel.createMessage(wrapper.createEmbed({
                    description: "You are on cooldown for this command"
                }));
            }
            
            // setting up
            command.client_user = client.user;
            command.client = client;
            command.guild = guild;

            command.resolvers = new CommandResolveBuilder(message, guild, args[1]);

            if (command.meta.for === "DEVELOPER" && !settings.devs.includes(message.author.id)) return;
            if (command.meta.for === "ADMIN" && !message.member.permissions.has("administrator")) return;
            if (command.meta.for === "MANAGER" && !message.member.permissions.has("manageGuild")) return;

            if (command.meta.argumentRequired && !args.slice(1).length) {
                return message.channel.createMessage(
                    MessageFormatter.codeblock(`usage: ${prefix}${args[0]} ${command.meta.usage}`))
            }
            command.execute({
                args: args.slice(1),
                message
            });
            command.meta.names.forEach(name => {
                client.cooldowns.set(name + message.author.id, command.meta.cooldown);
                setTimeout(() => {
                    client.cooldowns.delete(name + message.author.id);
                }, command.meta.cooldown);
            })
        }
    } catch (err) { }
}
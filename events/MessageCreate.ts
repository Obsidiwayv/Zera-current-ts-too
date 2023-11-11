import { GuildChannel, Message } from "@projectdysnomia/dysnomia";
import ZeraClient from "../src/clients/ZeraClient";
import { settings } from "../config/JSONConfig";
import { ICommandContextData } from "../commands/builds/CommandInterfaces";
import { CommandWrapper } from "../commands/builds/CommandWrapper";
import { Colors } from "../commands/builds/CommandBuild";
import CommandResolveBuilder from "../commands/builds/CommandResolveBuilder";

export default function(client: ZeraClient, message: Message) {
    if (message.author.bot) return;

    if (!message.content.startsWith(settings.prefix)) return;

    const args = message.content.slice(settings.prefix.length).trim().split(" ");
    const command = client.commands.get(args[0]);

    try {
        const guild = (<GuildChannel>message.channel).guild;

        if (command) {
            const wrapper = new CommandWrapper(Colors.Periwinkle);
            if (!client.cooldowns.has(`${message.author.id}-${args[0]}`)) {
                // setting up
                command.client_user = client.user;
                command.client = client;
                command.guild = guild;

                command.resolvers = new CommandResolveBuilder(message, guild, args[1]);

                if (command.meta.for === "DEVELOPER" && !settings.devs.includes(message.author.id)) return;
                if (command.meta.for === "ADMIN" && !message.member.permissions.has("administrator")) return;
                command.execute({ 
                    args: args.slice(1),
                    message 
                });
                command.meta.names.forEach(name => {
                    const format = `${message.author.id}-${name}`;
                    client.cooldowns.set(format, command.meta.cooldown);
                    setTimeout(() => {
                        client.cooldowns.delete(format);
                    }, command.meta.cooldown);
                }) 
            } else {
                message.channel.createMessage(wrapper.createEmbed({ 
                    description: "You are on cooldown for this command" 
                }));
            }
        }
    } catch (err) {}
}
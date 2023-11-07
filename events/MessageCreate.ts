import { Message } from "@projectdysnomia/dysnomia";
import ZeraClient from "../ZeraClient";
import { settings } from "../config/JSONConfig";
import { ICommandContextData } from "../commands/builds/CommandInterfaces";
import { CommandWrapper } from "../commands/builds/CommandWrapper";
import { Colors } from "../commands/builds/CommandBuild";

export default function(client: ZeraClient, message: Message) {
    if (message.author.bot) return;

    if (!message.content.startsWith(settings.prefix)) return;

    const args = message.content.slice(settings.prefix.length).trim().split(" ");
    const command = client.commands.get(args[0]);

    try {
        const baseCTX: ICommandContextData = { client, message, args };

        const ctx = { ...baseCTX };

        if (command) {
            const wrapper = new CommandWrapper(Colors.Periwinkle);
            if (!client.cooldowns.has(`${message.author.id}-${args[0]}`)) {
                command.execute(ctx);
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
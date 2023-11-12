import { AdvancedMessageContent, EmbedField, EmbedOptions } from "@projectdysnomia/dysnomia";
import { Colors } from "./CommandBuild";
import { getEmote } from "./TextUtils";

// wrapping embeds 
export class CommandWrapper {
    public constructor(public embedColor: string|number) {}

    public createEmbeds(embeds: EmbedOptions[]): AdvancedMessageContent {
        embeds.forEach(e => {
            if (!e.color) {
                if (typeof this.embedColor === "string") {
                    e.color = this.formatColorToHex(this.embedColor);
                } else {
                    e.color = this.embedColor;
                }
            } 
        });
        return { embeds };
    }

    public createSucessEmbed(content: string): AdvancedMessageContent {
        return {
            embeds: [{
                color: this.formatColorToHex(Colors["Mint Green"]),
                description: `${getEmote("check")} ${content}`
            }]
        };
    }

    public createEmbed(embed: EmbedOptions): AdvancedMessageContent {
        return this.createEmbeds([embed]);
    }

    public formatColorToHex(color: string) {
        return parseInt('0x' + color.slice(1));
    }
}
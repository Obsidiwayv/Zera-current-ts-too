import { AdvancedMessageContent, EmbedField, EmbedOptions } from "@projectdysnomia/dysnomia";

// wrapping embeds 
export class CommandWrapper {
    public constructor(public embedColor: number) {}

    public createEmbeds(embeds: EmbedOptions[]): AdvancedMessageContent {
        embeds.forEach(e => e.color = this.embedColor);
        return { embeds };
    }

    public createEmbed(embed: EmbedOptions): AdvancedMessageContent {
        embed.color = this.embedColor;
        return this.createEmbeds([embed]);
    }
}
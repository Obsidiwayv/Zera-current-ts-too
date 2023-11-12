import { settings } from "../../config/JSONConfig";

export function getEmote(name: (keyof typeof settings.emotes)) {
    return `<:${settings.emotes[name]}>`;
}
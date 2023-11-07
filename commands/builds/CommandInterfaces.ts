import Dysnomia from "@projectdysnomia/dysnomia";
import ZeraClient from "../../ZeraClient";

export interface ICommandData {
    names: string[];
    description: string;
    cooldown?: number;
    for?: CommandLevel;
    development?: DevelopmentLevel;
}

export interface ICommandContextData {
    message: Dysnomia.Message;
    client: ZeraClient;
    args: string[];
}

export type CommandLevel = "OWNER" | "ADMIN" | "USER";

// Alpha for development, Beta for Production
export type DevelopmentLevel = "ALPHA" | "BETA";
import Dysnomia from "@projectdysnomia/dysnomia";
import ZeraClient from "../../src/clients/ZeraClient";

export interface ICommandData {
    names: string[];
    description: string;
    usage?: string;
    cooldown?: number;
    for?: CommandLevel;
    development?: DevelopmentLevel;
    argumentRequired?: boolean;
}

export interface ICommandContextData {
    args: string[];
    message: Dysnomia.Message;
}

export type CommandLevel = "DEVELOPER" | "ADMIN" | "MANAGER" | "USER";

// Alpha for development, Beta for Production
export type DevelopmentLevel = "ALPHA" | "BETA";
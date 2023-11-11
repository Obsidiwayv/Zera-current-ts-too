import Dysnomia from "@projectdysnomia/dysnomia";
import ZeraClient from "../../src/clients/ZeraClient";

export interface ICommandData {
    names: string[];
    description: string;
    cooldown?: number;
    for?: CommandLevel;
    development?: DevelopmentLevel;
}

export interface ICommandContextData {
    args: string[];
    message: Dysnomia.Message;
}

export type CommandLevel = "DEVELOPER" | "ADMIN" | "USER";

// Alpha for development, Beta for Production
export type DevelopmentLevel = "ALPHA" | "BETA";
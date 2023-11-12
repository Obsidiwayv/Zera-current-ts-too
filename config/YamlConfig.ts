import YAML from "yaml";
import FS from "fs";
import { settings } from "./JSONConfig";

function parseYAML() {
    const file = FS.readFileSync("./config/secrets.yaml", "utf-8");
    return (YAML.parse(file) as ConfigData);
}

function parseDatabaseYAML(db?: string) {
    const file = FS.readFileSync("./config/databases.yaml", "utf-8");
    if (db) {
        return (YAML.parse(file) as DatabaseConfigData).database[db];
    } else {
        return (YAML.parse(file) as DatabaseConfigData);
    }
}

export function getYamlKey(key: (keyof ConfigData["config"])) {
    return parseYAML()["config"][key];
}

export function getYamlToken() {
    return settings.dev && !settings.staging ? getYamlKey("alphaToken") : getYamlKey("betaToken");
}

export const redisDB = parseDatabaseYAML("redis") as DatabaseConfigData["database"]["redis"];

export const mysqlDB = parseDatabaseYAML("mysql") as DatabaseConfigData["database"]["mysql"];

export const db_config = parseDatabaseYAML() as DatabaseConfigData;

interface ConfigData {
    config: {
        betaToken: string;
        alphaToken: string;
    }
}

interface DatabaseConfigData {
    database: {
        panel: string;
        redis: {
            port: number;
            password: string;
        }
        mysql: {
            dbname: string;
            username: string;
            password: string;
            endpoint: string;
            port: number;
        }
    }
}
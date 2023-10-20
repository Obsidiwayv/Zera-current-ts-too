import YAML from "yaml";
import FS from "fs";
import { settings } from "./JSONConfig";

function parseYAML() {
    const file = FS.readFileSync("./config/secrets.yaml", "utf-8");
    return (YAML.parse(file) as ConfigData);
}

export function getYamlKey(key: (keyof ConfigData["config"])) {
    return parseYAML()["config"][key];
}

export function getYamlToken() {
    return settings.dev ? getYamlKey("alphaToken") : getYamlKey("betaToken");
}

interface ConfigData {
    config: {
        betaToken: string;
        alphaToken: string;
    }
}
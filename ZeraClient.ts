import { Client } from "@projectdysnomia/dysnomia";
import { getYamlToken } from "./config/YamlConfig";

export = class ZeraClient extends Client {
    public constructor() {
        super(getYamlToken());
    }
}
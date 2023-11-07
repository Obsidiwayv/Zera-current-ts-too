import { Client, Constants } from "@projectdysnomia/dysnomia";
import { db_config, getYamlToken } from "./config/YamlConfig";
import { CommandBuild } from "./commands/builds/CommandBuild";

import Redis from "ioredis";

export = class ZeraClient extends Client {
    public commands = new Map<string,  CommandBuild>();
    public cooldowns = new Map<string, number>();

    public redis = new Redis({
        port: db_config.database.redis.port,
        password: db_config.database.redis.password,
        host: db_config.database.panel
    });

    public constructor() {
        super(getYamlToken(), {
            gateway: {
                intents: Constants.Intents.all
            }
        });
    }
}
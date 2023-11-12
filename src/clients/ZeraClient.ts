import { Client, Constants } from "@projectdysnomia/dysnomia";
import { db_config, getYamlToken, mysqlDB, redisDB } from "../../config/YamlConfig";
import { CommandBuild } from "../../commands/builds/CommandBuild";

import Redis from "ioredis";
import Knex from "knex";

export = class ZeraClient extends Client {
    public commands = new Map<string,  CommandBuild>();
    public cooldowns = new Map<string, number>();

    public redis = new Redis({
        port: redisDB.port,
        password: redisDB.password,
        host: db_config.database.panel
    });

    public knex = Knex({
        client: "mysql",
        connection: {
            host: mysqlDB.endpoint,
            port: mysqlDB.port,
            user: mysqlDB.username,
            password: mysqlDB.password,
            database: mysqlDB.dbname
        }
    })

    public constructor() {
        super(getYamlToken(), {
            gateway: {
                intents: Constants.Intents.all
            },
            defaultImageSize: Constants.ImageSizeBoundaries.MAXIMUM
        });
    }
}
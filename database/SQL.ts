import { client } from "../app";
import { Knex } from "knex";
import PrefixTable from "./tables/PrefixTable";
import ChannelTable from "./tables/ChannelTable";

// Why is this the biggest function name here
export function createTableIfDoesNotExist(table: string, callback: (t: Knex.TableBuilder) => any) {
    client.knex.schema.hasTable(table).then((has) => {
        if (!has) return client.knex.schema.createTable(table, callback);
    });
}

export class SQL {
    public prefix = new PrefixTable();
    public channels = new ChannelTable();
}
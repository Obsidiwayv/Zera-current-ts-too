import { PrefixChangableNullable, PrefixData } from "../data/PrefixData";
import BaseTable from "./BaseTable";

export default class PrefixTable extends BaseTable<PrefixChangableNullable, PrefixData> {
    public constructor() {
        super("PREFIX");
    }

    public async update({ guid, setting, lastChanged }: PrefixData) {
        return await this.has({ guid }) === undefined ?
            this.knex.insert({ guid, setting, lastChanged }) :
            this.knex.where({ guid }).first().update({ setting, lastChanged });
    }

    public async get(guid: string) {
        return await this.pull({ guid }).then((v) => v) || false;
    }
}
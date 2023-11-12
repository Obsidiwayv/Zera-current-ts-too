import { client } from "../../app";

export default class BaseTable<T extends Object, A extends Object> {
    public constructor(public table: string) {}

    public pull(data: T) {
        return client.knex<A>(this.table).where(data).first();
    }

    public async has(data: T) {
        return await this.knex.where(data).first().then(v => v);
    }

    get knex() {
        return client.knex(this.table);
    }
}
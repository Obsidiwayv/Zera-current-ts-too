import { ChannelData, ChannelDataChangableNullable } from "../data/ChannelData";
import BaseTable from "./BaseTable";

export default class ChannelTable extends BaseTable<ChannelDataChangableNullable, ChannelData> {
    public constructor() {
        super("CHANNELS");
    }

    public async update(channel: string, channelID: string, guid: string) {
        let data;

        switch (channel) {
            case "welcome":
                data = { welcome: channelID };
                break;
            case "leave":
                data = { leave: channelID };
                break;
        }

        return await this.has({ guid }) === undefined ?
            this.knex.insert({ guid, ...data }) :
            this.knex.where({ guid }).first().insert(data);
    }
}
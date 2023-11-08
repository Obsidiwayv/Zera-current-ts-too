import ZeraClient from "../src/clients/ZeraClient";

export default function(client: ZeraClient) {
    client.redis.set("guilds", client.guilds.size.toString());
    client.redis.set("users", client.users.size.toString());
    console.log("Ready");
}
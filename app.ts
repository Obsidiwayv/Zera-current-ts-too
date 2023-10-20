import ZeraClient from "./ZeraClient";
import { settings } from "./config/JSONConfig";
import execute from "exe";

const client = new ZeraClient();

if (settings.server) {
    execute("start binaries/python/python.exe server/app.py");
}

client.connect();
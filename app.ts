import createLog from "./Logger";
import ZeraClient from "./ZeraClient";
import { paths, settings } from "./config/JSONConfig";
import execute from "exe";
import os from "os";

const client = new ZeraClient();

if (settings.server) {
    createLog("Initing python server...");
    execute(`${(os.platform() === "linux") ? "python" : `start ${paths.python}`} server/app.py`);
}



client.connect();
import execute from "exe";
import os from "os";
import { paths } from "./config/JSONConfig";

export default function createLog(text: string) {
    execute(`${os.platform() === "linux" ? paths.lua.linux : `start /b ${paths.lua.win64}`} logManager.lua init ${text}`);
}
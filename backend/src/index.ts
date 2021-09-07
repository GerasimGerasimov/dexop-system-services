import { HttpServer } from "./server/httpserver";
import { getConfiguration } from "./utils/utils";

console.log('DExSOP-system-services started...');
const settings = getConfiguration();
const Server: HttpServer = new HttpServer(settings.port);
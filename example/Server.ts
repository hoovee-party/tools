import { Tools } from "../src";
import tools, { Services } from "./tools";

class Server {
  port: number;
  host: string;

  constructor() {
    this.port = tools.configuration.port;
    this.host = tools.configuration.host;
  }

  start() {
    /*
      http.createServer(function (req, res) {
        res.write('Hello World!');
        res.end();
      }).listen(this.port);
    */
  }
}

declare module "./tools" {
  interface Services {
    server: Server;
  }
}

export default (tools: Tools<Services>) => {
  tools.service("server", () => new Server());
};

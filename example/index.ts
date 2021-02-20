import tools from "./tools";
import configuration from "./configuration";
import Server from "./Server";

export default function start() {
  configuration(tools);
  Server(tools);
  tools.server.start();
}

import Server from ".";
import { ServicesContainer } from "../../container";

declare module "../../container" {
  interface Services {
    server: Server;
  }
}

export default (container: ServicesContainer) => {
  container.service(
    "server",
    () =>
      new Server(
        container.configuration.host,
        container.configuration.port,
        container.remoteConfiguration.color
      )
  );
};

import container from "./container";
import ConfigurationProvider from "./services/Configuration/provider";
import RemoteConfigurationProvider from "./services/RemoteConfiguration/provider";
import ServerProvider from "./services/Server/provider";

export default async function start() {
  ConfigurationProvider(container);
  RemoteConfigurationProvider(container);
  ServerProvider(container);

  await container.start("remoteConfiguration");

  container.server.start();
}

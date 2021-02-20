import createRemoteConfiguration, { RemoteConfiguration } from ".";
import { ServicesContainer } from "../../container";

declare module "../../container" {
  interface Services {
    remoteConfiguration: RemoteConfiguration;
  }
}

export default (container: ServicesContainer) => {
  container.service(
    "remoteConfiguration",
    async () => await createRemoteConfiguration()
  );
};

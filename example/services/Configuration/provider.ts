import createConfiguration, { Configuration } from ".";
import { ServicesContainer } from "../../container";

declare module "../../container" {
  interface Services {
    configuration: Configuration;
  }
}

export default (container: ServicesContainer) => {
  container.service("configuration", () => createConfiguration());
};

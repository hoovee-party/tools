import { Tools } from "../src";
import { Services } from "./tools";

type Configuration = {
  port: number;
  host: string;
};

const configuration: Configuration = {
  port: 3000,
  host: "0.0.0.0",
};

declare module "./tools" {
  interface Services {
    configuration: Configuration;
  }
}

export default (tools: Tools<Services>) => {
  tools.service("configuration", () => configuration);
};

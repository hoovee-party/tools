import tools from "./tools";

type Configuration = {
  host: string;
};

const configuration: Configuration = {
  host: "https://www.hoovee.party",
};

declare module "./tools" {
  interface Services {
    configuration: Configuration;
  }
}

tools.service("configuration", () => configuration);

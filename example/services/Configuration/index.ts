export type Configuration = {
  port: number;
  host: string;
};

function createConfiguration(): Configuration {
  return {
    port: 3000,
    host: "0.0.0.0",
  };
}

export default createConfiguration;

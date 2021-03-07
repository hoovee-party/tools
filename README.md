# @hoovee.party/tools

Simple strongly-typed IOC container

## Usage

Create a container in a file available from all other. This container may not require any of your dependencies. It will made dependencies available wherever needed in the codebase.

```ts
// example/container.ts

import createTools, { Container } from "../src/index";
export interface Services {}
export type ServicesContainer = Container<Services>;
const tools: ServicesContainer = createTools<Services>();
export default tools;
```

Register services. Make sure to `start` services provided asynchronously.

```ts
// example/index.ts

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
```

Use declaration merging to make TS aware of injected services

```ts
// example/services/Configuration/provider.ts

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
```

## Examples

Full example in [example folder](../HEAD/example)

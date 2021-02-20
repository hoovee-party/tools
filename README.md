# @hoovee.party/tools

Simple strongly-typed IOC container

## Usage

Create a container in a file available from all other. This container may not require any of your dependencies. It will made dependencies available wherever needed in the codebase.

```javascript
import createTools from "@hoovee.party/tools"
interface Services = {}
const tools = createTools<Services>() ;
export default tools ;
```

Create services and export provider functions

```javascript
// configruration.ts

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

```

```javascript
// Server.ts (using configuration)
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
    http.createServer(function (req, res) {
      res.write('Hello World!');
      res.end();
    }).listen(this.port);
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

```

Inject deps usign providers

```javascript
import tools from "./tools";
import configuration from "./configuration";
import Server from "./Server";

export default function start() {
  configuration(tools);
  Server(tools);
  tools.server.start();
}
```

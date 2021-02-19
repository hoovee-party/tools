# @hoovee.party/tools

Simple strongly-typed IOC container

## Usage

First, create a container in a file available from all other. This container may not require any of your dependencies. It will made dependencies available wherever needed in the codebase.

    // src/tools.ts
    import createTools from "@hoovee.party/tools"
    interface Services = {}
    const tools = createTools<Services>() ;
    export default tools ;

To inject a service (exemple here with configuration)

    import tools from "./tools";

    // Create the service
    type Configuration = {
      host: string;
    };

    const configuration: Configuration = {
      host: "https://www.hoovee.party",
    };

    // Declare to typescript using merging
    declare module "./tools" {
      interface Services {
        configuration: Configuration;
      }
    }

    // Provide it
    tools.service("configuration", () => configuration);

To consume a service (exemple here with data layer)

    import tools from "./tools";

    function getData() {
      const host = tools.configuration.host;
      /* Cutsom logic with host, like fetch(host) */
    }

    export default getData;

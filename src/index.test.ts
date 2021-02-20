import createTools from "./index";
import { expect } from "chai";

describe("Tools module", () => {
  it("When a dep' is provided, should be available", () => {
    type Deps = {
      configuration: { host: string };
    };

    // Arrange
    const tools = createTools<Deps>();
    // Act
    tools.service("configuration", () => ({
      host: "https://www.hoovee.party",
    }));
    const configuration = tools.configuration;
    // Assert
    expect(configuration.host).to.equal("https://www.hoovee.party");
  });

  it("When deps' are provided, should be available dynamically", () => {
    type Deps = {
      configuration: { welcoming: string };
      welcome: (name: string) => void;
    };
    // Arrange
    const tools = createTools<Deps>();
    // Act
    tools.service("configuration", () => ({
      welcoming: "Bonjour",
    }));
    tools.service("welcome", () => (name) =>
      `${tools.configuration.welcoming} ${name} !`
    );
    const welcome = tools.welcome;
    // Assert
    expect(welcome("Kevin")).to.equal("Bonjour Kevin !");
  });

  it("When deps is not provided, should throw an error", () => {
    type Deps = {
      configuration: { welcoming: string };
    };
    // Arrange
    const tools = createTools<Deps>();
    // Act
    // Assert
    expect(() => tools.configuration).to.throw();
  });

  it("When deps is async, should throw if service has not been started before being used", async () => {
    // Arrange
    type Deps = {
      configuration: { host: string };
    };

    // Act
    const tools = createTools<Deps>();
    tools.service("configuration", () => {
      return new Promise<{ host: string }>((resolve) => {
        setTimeout(() => resolve({ host: "https://www.hoovee.party" }), 300);
      });
    });

    // Assert
    expect(() => tools.configuration).to.throw();
  });

  it("When deps is async, should made it availble after async start", async () => {
    // Arrange
    type Deps = {
      configuration: { host: string };
    };
    const tools = createTools<Deps>();

    // Act
    tools.service("configuration", () => {
      return new Promise<{ host: string }>((resolve) => {
        setTimeout(() => resolve({ host: "https://www.hoovee.party" }), 300);
      });
    });
    await tools.start("configuration");

    // Assert
    expect(tools.configuration.host).to.equal("https://www.hoovee.party");
  });
});

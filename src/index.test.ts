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
});

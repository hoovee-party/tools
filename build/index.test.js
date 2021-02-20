"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const chai_1 = require("chai");
describe("Tools module", () => {
    it("When a dep' is provided, should be available", () => {
        // Arrange
        const tools = index_1.default();
        // Act
        tools.service("configuration", () => ({
            host: "https://www.hoovee.party",
        }));
        const configuration = tools.configuration;
        // Assert
        chai_1.expect(configuration.host).to.equal("https://www.hoovee.party");
    });
    it("When deps' are provided, should be available dynamically", () => {
        // Arrange
        const tools = index_1.default();
        // Act
        tools.service("configuration", () => ({
            welcoming: "Bonjour",
        }));
        tools.service("welcome", () => (name) => `${tools.configuration.welcoming} ${name} !`);
        const welcome = tools.welcome;
        // Assert
        chai_1.expect(welcome("Kevin")).to.equal("Bonjour Kevin !");
    });
    it("When deps is not provided, should thorw an error", () => {
        // Arrange
        const tools = index_1.default();
        // Act
        // Assert
        chai_1.expect(() => tools.configuration).to.throw();
    });
});
//# sourceMappingURL=index.test.js.map
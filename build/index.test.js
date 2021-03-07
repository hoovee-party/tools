"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        tools.register("configuration", () => ({
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
        tools.register("configuration", () => ({
            welcoming: "Bonjour",
        }));
        tools.register("welcome", () => (name) => `${tools.configuration.welcoming} ${name} !`);
        const welcome = tools.welcome;
        // Assert
        chai_1.expect(welcome("Kevin")).to.equal("Bonjour Kevin !");
    });
    it("When deps is not provided, should throw an error", () => {
        // Arrange
        const tools = index_1.default();
        // Act
        // Assert
        chai_1.expect(() => tools.configuration).to.throw();
    });
    it("When deps is async, should throw if service has not been started before being used", () => __awaiter(void 0, void 0, void 0, function* () {
        // Act
        const tools = index_1.default();
        tools.register("configuration", () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve({ host: "https://www.hoovee.party" }), 300);
            });
        });
        // Assert
        chai_1.expect(() => tools.configuration).to.throw();
    }));
    it("When deps is async, should made it availble after async start", () => __awaiter(void 0, void 0, void 0, function* () {
        const tools = index_1.default();
        // Act
        tools.register("configuration", () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve({ host: "https://www.hoovee.party" }), 300);
            });
        });
        yield tools.start("configuration");
        // Assert
        chai_1.expect(tools.configuration.host).to.equal("https://www.hoovee.party");
    }));
});
//# sourceMappingURL=index.test.js.map
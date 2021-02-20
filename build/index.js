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
Object.defineProperty(exports, "__esModule", { value: true });
function createContainer() {
    const services = {};
    const getters = {};
    const tools = {
        service: (name, getter) => {
            getters[name] = getter;
            Object.defineProperty(tools, name, {
                get: () => {
                    let existingService = services[name];
                    if (existingService)
                        return existingService;
                    const newService = getter(proxy);
                    if (newService instanceof Promise)
                        throw new Error(`Service ${name} must be started asynchonously`);
                    services[name] = newService;
                    return newService;
                },
                configurable: true,
                enumerable: true,
            });
        },
        start: (name) => __awaiter(this, void 0, void 0, function* () {
            let existingService = services[name];
            if (existingService)
                return;
            const getter = getters[name];
            if (!getter)
                throw new Error(`Service ${name} is not registred`);
            const newService = yield getter(proxy);
            services[name] = newService;
            return;
        }),
    };
    const proxy = new Proxy(tools, {
        get: (target, prop) => {
            const service = target[prop];
            if (!service)
                throw new Error(`Service ${prop} has not been provided yet`);
            else
                return service;
        },
    });
    return proxy;
}
exports.default = createContainer;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTools() {
    const services = {};
    const tools = {
        service: (name, getter) => {
            Object.defineProperty(tools, name, {
                get: () => {
                    let existingService = services[name];
                    if (existingService)
                        return existingService;
                    const newService = getter(tools);
                    services[name] = newService;
                    return newService;
                },
                configurable: true,
                enumerable: true,
            });
        },
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
exports.default = createTools;
//# sourceMappingURL=index.js.map
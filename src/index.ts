export type Container<TServices extends {}> = {
  service: <TName extends keyof TServices>(
    name: TName,
    getter: (
      services: Container<TServices>
    ) => TServices[TName] | Promise<TServices[TName]>
  ) => void;
  start: <TName extends keyof TServices>(name: TName) => Promise<void>;
} & TServices;

export default function createContainer<TServices extends {}>() {
  const services: Partial<TServices> = {};

  const getters: Partial<
    {
      [name in keyof TServices]: (
        services: Container<TServices>
      ) => TServices[name] | Promise<TServices[name]>;
    }
  > = {};

  const tools: Container<TServices> = {
    service: <TName extends keyof TServices>(
      name: TName,
      getter: (
        services: Container<TServices>
      ) => TServices[TName] | Promise<TServices[TName]>
    ) => {
      getters[name] = getter;
      Object.defineProperty(tools, name, {
        get: () => {
          let existingService = services[name];
          if (existingService) return existingService;
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

    start: async <TName extends keyof TServices>(name: TName) => {
      let existingService = services[name];
      if (existingService) return;
      const getter = getters[name];
      if (!getter) throw new Error(`Service ${name} is not registred`);
      const newService = await getter(proxy);
      services[name] = newService;
      return;
    },
  } as Container<TServices>;

  const proxy = new Proxy(tools, {
    get: (target: Container<TServices>, prop: keyof typeof target) => {
      const service = target[prop];
      if (!service)
        throw new Error(`Service ${prop} has not been provided yet`);
      else return service;
    },
  });

  return proxy;
}

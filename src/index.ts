// Types

type ServicesList = { [key: string]: any };

type GetterFn<TServices extends ServicesList, TName extends keyof TServices> = (
  services: Container<TServices>
) => TServices[TName] | Promise<TServices[TName]>;

type RegisterFn<TServices> = <TName extends keyof TServices>(
  name: TName,
  getter: GetterFn<TServices, TName>
) => void;

export type Container<TServices extends ServicesList> = {
  register: RegisterFn<TServices>;
  start: <TName extends keyof TServices>(name: TName) => Promise<void>;
} & TServices;

//

export default function createContainer<TServices extends ServicesList>() {
  const services: Partial<TServices> = {};

  const getters: Partial<
    { [TName in keyof TServices]: GetterFn<TServices, TName> }
  > = {};

  const register: RegisterFn<TServices> = (name, getter) => {
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
  };

  const start = async <TName extends keyof TServices>(name: TName) => {
    let existingService = services[name];
    if (existingService) return;
    const getter = getters[name];
    if (!getter) throw new Error(`Service ${name} is not registred`);
    const newService = await getter(proxy);
    services[name] = newService;
    return;
  };

  const tools: Container<TServices> = {
    register,
    start,
  } as Container<TServices>;

  const proxy = new Proxy(tools, {
    get: (target: Container<TServices>, prop: string) => {
      const service = target[prop];
      if (prop === "start" || prop === "register" || isValidServiceName(prop)) {
        if (!service)
          throw new Error(`Service ${prop} has not been provided yet`);
        return service;
      } else {
        return service;
      }
    },
  });

  return proxy;
}

function isValidServiceName(name: string) {
  return !!name.match(/^[A-Za-z]+$/);
}

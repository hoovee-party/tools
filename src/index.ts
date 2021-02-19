export interface ToolsServices {}

type Tools<TServices extends {}> = {
  service: <TName extends keyof TServices>(
    name: TName,
    getter: (services: TServices) => TServices[TName]
  ) => void;
} & TServices;

export default function createTools<TServices extends {}>() {
  const services: Partial<TServices> = {};

  const tools: Tools<TServices> = {
    service: <TName extends keyof TServices>(
      name: TName,
      getter: (services: TServices) => TServices[TName]
    ) => {
      Object.defineProperty(tools, name, {
        get: () => {
          let existingService = services[name];
          if (existingService) return existingService;
          const newService = getter(tools);
          services[name] = newService;
          return newService;
        },
        configurable: true,
        enumerable: true,
      });
    },
  } as Tools<TServices>;

  return tools;
}

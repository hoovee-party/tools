export declare type Container<TServices extends {}> = {
    service: <TName extends keyof TServices>(name: TName, getter: (services: Container<TServices>) => TServices[TName] | Promise<TServices[TName]>) => void;
    start: <TName extends keyof TServices>(name: TName) => Promise<void>;
} & TServices;
export default function createContainer<TServices extends {}>(): Container<TServices>;

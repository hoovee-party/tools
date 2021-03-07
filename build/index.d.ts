declare type ServicesList = {
    [key: string]: any;
};
declare type GetterFn<TServices extends ServicesList, TName extends keyof TServices> = (services: Container<TServices>) => TServices[TName] | Promise<TServices[TName]>;
declare type RegisterFn<TServices> = <TName extends keyof TServices>(name: TName, getter: GetterFn<TServices, TName>) => void;
export declare type Container<TServices extends ServicesList> = {
    register: RegisterFn<TServices>;
    start: <TName extends keyof TServices>(name: TName) => Promise<void>;
} & TServices;
export default function createContainer<TServices extends ServicesList>(): Container<TServices>;
export {};

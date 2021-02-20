export declare type Tools<TServices extends {}> = {
    service: <TName extends keyof TServices>(name: TName, getter: (services: TServices) => TServices[TName]) => void;
} & TServices;
export default function createTools<TServices extends {}>(): Tools<TServices>;

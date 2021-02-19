export interface Services {
}
declare const tools: {
    service: <TName extends never>(name: TName, getter: (services: {}) => {}[TName]) => void;
};
export default tools;

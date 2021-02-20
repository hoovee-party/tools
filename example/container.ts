import createTools, { Container } from "../src/index";
export interface Services {}
export type ServicesContainer = Container<Services>;
const tools: ServicesContainer = createTools<Services>();
export default tools;

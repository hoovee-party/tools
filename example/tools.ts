import createTools from "../src/index";
export interface Services {}
const tools = createTools<Services>();
export default tools;

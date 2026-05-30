import { seed } from "./seed.js";
seed().then(() => process.exit(0)).catch(console.error);
const fs = require("fs");

const envVars = [
  "ENGINE_API_KEY",
  "GOOGLE_SHEETS_CLIENT_ID",
  "GOOGLE_SHEETS_PROJECT_ID",
  "GOOGLE_SHEETS_SECRET"
];

const data = envVars.map(e => `${e}=${process.env[e]}`).join("\n");

fs.writeFileSync("./build/.env", data);

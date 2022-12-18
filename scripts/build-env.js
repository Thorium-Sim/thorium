const fs = require("fs");

const envVars = [
  "GOOGLE_SHEETS_CLIENT_ID",
  "GOOGLE_SHEETS_PROJECT_ID",
  "GOOGLE_SHEETS_SECRET",
  "GH_ISSUE_TOKEN",
];

const data = envVars.map(e => `${e}=${process.env[e]}`).join("\n");

fs.writeFileSync("./build/.env", data);

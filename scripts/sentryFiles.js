require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { upload } = require("sentry-files");
const { version } = require("../package.json");

const config = {
  version: `react@${version}`,
  organization: process.env.ERROR_REPORTING_ORGANIZATION,
  project: process.env.ERROR_REPORTING_PROJECT,
  token: process.env.ERROR_REPORTING_API_TOKEN,
  files: getFiles()
};

function getFiles() {
  return fs.readdirSync("build/static/js").map(f => ({
    name: `~/static/js/${f}`,
    path: `build/static/js/${f}`
  }));
}
console.log("Uploading files to Sentry.io...");
upload(config)
  .then(data => console.log("----- SUCCESS ----\n", data))
  .catch(error => console.log("---- ERROR ----\n", error));

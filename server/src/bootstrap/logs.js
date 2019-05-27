import paths from "../helpers/paths";
import fs from "fs";
import mkdirp from "mkdirp";

require("dotenv").config({ debug: true, path: `${__dirname}/../.env` });

console.log(process.env);
console.log(fs.readdirSync(`${__dirname}/..`));
try {
  console.log(fs.readFileSync(`${__dirname}/../.env`, "utf8"));
} catch {
  console.log(`Could not find or load ${__dirname}/../.env`);
}
// There is an error message freaking users out, and I
// can't figure out how to turn it off. So monkey patching
// so it doesn't show up anymore.
const warn = console.warn;
console.warn = message => {
  if (
    message.indexOf(
      'Pass false into "resolverValidationOptions.requireResolversForResolveType'
    ) > -1
  )
    return;
  warn(message);
};

// Check to see if we are in development mode or not.
if (
  process.argv0.split("/").indexOf("node") === -1 &&
  process.argv0.split("/").indexOf("node.exe") === -1 &&
  process.argv0.split("\\").indexOf("node.exe") === -1
) {
  process.env.NODE_ENV = "production";
} else {
  // Load the Sentry error tracking
  require("../helpers/sentry");
}

let logDir = "./logs";
if (process.env.NODE_ENV === "production") {
  logDir = paths.userData + "/logs";
}

export default function logger() {
  mkdirp.sync(logDir);
  const access = fs.createWriteStream(
    `${logDir}/access.${new Date()
      .toLocaleString()
      .split("/")
      .join("-")
      .split(", ")
      .join("_")
      .split(" ")
      .join("_")
      .split(":")
      .join("-")}.log`,
    { flags: "a" }
  );
  const error = fs.createWriteStream(
    `${logDir}/error.${new Date()
      .toLocaleString()
      .split("/")
      .join("-")
      .split(", ")
      .join("_")
      .split(" ")
      .join("_")
      .split(":")
      .join("-")}.log`,
    { flags: "a" }
  );

  const fn = process.stdout.write;
  const errFn = process.stderr.write;

  function write() {
    fn.apply(process.stdout, arguments);
    access.write.apply(access, arguments);
  }
  function writeErr() {
    errFn.apply(process.stderr, arguments);
    error.write.apply(error, arguments);
  }

  process.stdout.write = write;
  process.stderr.write = writeErr;
  return Promise.resolve();
}

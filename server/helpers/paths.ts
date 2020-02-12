import fs from "fs";
import mkdirp from "mkdirp";
if (!fs.existsSync(`${require("os").homedir()}/Documents`)) {
  fs.mkdirSync(`${require("os").homedir()}/Documents`);
}

let thoriumPath = `${require("os").homedir()}/Documents/thorium`;

if (process.env.THORIUM_PATH) {
  const testPath = String(process.env.THORIUM_PATH).replace(
    "~",
    require("os").homedir(),
  );
  try {
    mkdirp.sync(testPath);
    thoriumPath = testPath;
  } catch {
    // Do nothing.
  }
}

const paths = {
  userData: thoriumPath,
};

export default paths;

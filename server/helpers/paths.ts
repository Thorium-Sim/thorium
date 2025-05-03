import fs from "fs";
import mkdirp from "mkdirp";
import os from 'os'
if (!fs.existsSync(`${os.homedir()}/Documents`)) {
  fs.mkdirSync(`${os.homedir()}/Documents`);
}

let thoriumPath = `${os.homedir()}/Documents/thorium`;

if (process.env.THORIUM_PATH) {
  const testPath = String(process.env.THORIUM_PATH).replace(
    "~",
    os.homedir(),
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

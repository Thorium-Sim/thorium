import fs from "fs";
import path from "path";

const dir = "./server/schema/queries/";
module.exports = "";
fs
  .readdirSync(path.resolve(dir))
  .filter(p => p.indexOf(".graphql") > -1)
  .map(p => fs.readFileSync(`${dir}${p}`, "utf-8"))
  .forEach((p, index) => (module.exports += p));

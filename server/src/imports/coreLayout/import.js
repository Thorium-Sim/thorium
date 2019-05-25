import fs from "fs";
import App from "../../app";
import * as Classes from "../../classes";

export default function ImportCoreLayout(filepath, cb) {
  console.log("Importing Core Layout");
  const file = fs.readFileSync(filepath, "utf8");
  try {
    const data = JSON.parse(file);
    if (data.class === "CoreLayout") {
      App.coreLayouts.push(new Classes.CoreLayout(data));
    }
  } catch (err) {}
  cb(null);
}

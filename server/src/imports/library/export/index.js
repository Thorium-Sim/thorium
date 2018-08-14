import App from "../../../app";
import yazl from "yazl";

import path from "path";
import fs from "fs";
import paths from "../../../helpers/paths";

let assetDir = path.resolve("./");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

const addAsset = (key, zip) => {
  if (!key) return;
  const objectLoc = `${assetDir}/assets/${key}`.replace("//", "/");
  if (!fs.existsSync(objectLoc)) return;
  zip.addFile(objectLoc, `library/assets${key}`);
};

function processExport(entry, zip) {
  const libBuff = new Buffer(JSON.stringify(entry));
  zip.addBuffer(libBuff, `library/${entry.slug}.json`, {
    mtime: new Date(),
    mode: parseInt("0100664", 8)
  });
  // Add the image
  addAsset(entry.image, zip);
}

export default function exportLibrary(simId, libId, res) {
  const sim = App.simulators.find(s => s.id === simId);
  if (!sim) {
    return res.end("No simulator");
  }
  const zipfile = new yazl.ZipFile();
  if (libId) {
    const lib = App.libraryDatabase.find(l => l.id === libId);
    if (!lib) {
      return res.end("No library entry");
    }
    processExport(lib, zipfile);
  } else {
    App.libraryDatabase.filter(l => l.simulatorId === simId).forEach(e => {
      processExport(e, zipfile);
    });
  }
  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=Library Export.libexp`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

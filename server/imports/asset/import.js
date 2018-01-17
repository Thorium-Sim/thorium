import path from "path";
import paths from "../../helpers/paths";
import loadAsset from "../missions/import/loadAsset";
import yauzl from "yauzl";
import mkdirp from "mkdirp";
import fs from "fs";

let assetDir = path.resolve("./");
if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

export default function ImportAssets(filepath, cb) {
  yauzl.open(filepath, { lazyEntries: true }, function(err, importZip) {
    if (err) throw err;
    importZip.on("close", function() {
      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function(entry) {
      if (/^assets\/.*/.test(entry.fileName)) {
        // It's an asset. Load it
        const regexRes = /(\/.*)\/.*\..{3,}/gi.exec(entry.fileName);
        if (!regexRes || entry.fileName.indexOf(".DS_Store") > -1) {
          importZip.readEntry();
          return;
        }
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          readStream.on("end", function() {
            importZip.readEntry();
          });
          const filename = entry.fileName;
          const directorypath = filename
            .split("/")
            .splice(0, filename.split("/").length - 1)
            .join("/");
          mkdirp.sync(`${assetDir}/${directorypath}`);
          console.log("AssetDir", assetDir);
          console.log("filename", filename);
          console.log("directoryPath", directorypath);
          const output = fs.createWriteStream(`${assetDir}/${filename}`);
          readStream.pipe(output);
          loadAsset(entry, /(\/.*)\/.*\..{3,}/gi);
        });
      } else {
        importZip.readEntry();
      }
    });
  });
}

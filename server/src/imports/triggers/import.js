import yauzl from "yauzl";
import path from "path";
import paths from "../../helpers/paths";
import fs from "fs";
import App from "../../app";
import mkdirp from "mkdirp";
import * as Classes from "../../classes";
import { pubsub } from "../../helpers/subscriptionManager.js";

let assetDir = path.resolve("./");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

function streamToString(stream, cb) {
  const chunks = [];
  stream.on("data", chunk => {
    chunks.push(chunk.toString());
  });
  stream.on("end", () => {
    cb(chunks.join(""));
  });
}
const regexPath = /[^\\]*\.(\w+)$/;

export default function ImportTrigger(filepath, cb) {
  console.log("Importing Trigger");
  yauzl.open(filepath, { lazyEntries: true }, function(err, importZip) {
    if (err) throw err;
    importZip.on("close", function() {
      pubsub.publish("triggersUpdate", App.triggerGroups);

      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function(entry) {
      if (/^trigger\/assets/.test(entry.fileName)) {
        console.log("Copying file", entry.fileName);
        // It's an asset. Load it
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          readStream.on("end", function() {
            importZip.readEntry();
          });
          let filename = entry.fileName.replace("trigger/", "");
          if (
            filename
              .split("/")
              [filename.split("/").length - 1].indexOf("default") > -1
          ) {
            const [_, ext] = filename.match(regexPath);
            const pathList = filename.split("/");
            filename =
              pathList.slice(0, pathList.length - 1).join("/") + "." + ext;
          }
          const directorypath = filename
            .split("/")
            .splice(0, filename.split("/").length - 1)
            .join("/");

          mkdirp.sync(`${assetDir}/${directorypath}`);
          readStream.pipe(fs.createWriteStream(`${assetDir}/${filename}`));
        });
      }
      if (/^trigger\/tacticals\.json/.test(entry.fileName)) {
        // Tactical
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const maps = JSON.parse(str);
            maps.forEach(map => {
              if (App.tacticalMaps.find(t => t.id === map.id)) {
                App.tacticalMaps = App.tacticalMaps.filter(
                  t => t.id !== map.id
                );
              }
              App.tacticalMaps.push(new Classes.TacticalMap(map));
            });
            importZip.readEntry();
          });
        });
      }
      if (/trigger\/trigger.json/.test(entry.fileName)) {
        // Trigger
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const trigger = JSON.parse(str);
            if (App.triggerGroups.find(t => t.id === trigger.id)) {
              App.triggerGroups = App.triggerGroups.filter(
                t => t.id !== trigger.id
              );
            }
            App.triggerGroups.push(new Classes.Trigger(trigger));
            importZip.readEntry();
          });
        });
      }
    });
  });
}

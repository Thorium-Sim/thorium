import yauzl from "yauzl";
import path from "path";
import paths from "../../../helpers/paths";
import fs from "fs";
import App from "../../../app";
import mkdirp from "mkdirp";
import * as Classes from "../../../classes";

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

export default function ImportMission(filepath, cb) {
  yauzl.open(filepath, { lazyEntries: true }, function(err, importZip) {
    if (err) throw err;
    importZip.on("close", function() {
      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function(entry) {
      if (/^mission\/assets/.test(entry.fileName)) {
        // It's an asset. Load it
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          readStream.on("end", function() {
            importZip.readEntry();
          });
          const filename = entry.fileName.replace("mission/", "");
          const directorypath = filename
            .split("/")
            .splice(0, filename.split("/").length - 1)
            .join("/");
          mkdirp.sync(`${assetDir}/${directorypath}`);
          const output = fs.createWriteStream(`${assetDir}/${filename}`);
          readStream.pipe(output);
        });
      }
      if (/^mission\/tacticals\.json/.test(entry.fileName)) {
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
      if (/mission\/mission.json/.test(entry.fileName)) {
        // Mission
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const mission = JSON.parse(str);
            if (App.missions.find(t => t.id === mission.id)) {
              App.missions = App.missions.filter(t => t.id !== mission.id);
            }
            App.missions.push(new Classes.Mission(mission));
            importZip.readEntry();
          });
        });
      }
    });
  });
}

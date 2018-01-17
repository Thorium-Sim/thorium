import App from "../../app";
import mkdirp from "mkdirp";
import * as Classes from "../../classes";
import uuid from "uuid";
import yauzl from "yauzl";
import path from "path";
import paths from "../../helpers/paths";
import fs from "fs";
import loadAsset from "../missions/import/loadAsset";
let assetDir = path.resolve("./public/");

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

export default function ImportSimulator(filepath, cb) {
  const aspects = {};
  yauzl.open(filepath, { lazyEntries: true }, function(err, importZip) {
    if (err) throw err;
    const simId = uuid.v4();
    importZip.on("close", function() {
      // Process all of the aspects.
      // Connect rooms to decks
      if (aspects.decks) {
        aspects.decks = aspects.decks.map(d => {
          const deckId = uuid.v4();
          if (aspects.rooms) {
            aspects.rooms = aspects.rooms.map(r => {
              if (r.deckId === d.id) {
                return Object.assign({}, r, { deckId });
              }
              return r;
            });
          }
          return Object.assign({}, d, { id: deckId });
        });
      }

      // Connect system locations to rooms
      aspects.rooms = (aspects.rooms || []).map(r => {
        const roomId = uuid.v4();
        if (aspects.inventory) {
          aspects.inventory = aspects.inventory.map(i => {
            if (i.roomCount[r.id]) {
              i.roomCount[roomId] = i.roomCount[r.id];
              delete i.roomCount[r.id];
            }
            return i;
          });
        }
        if (aspects.systems) {
          aspects.systems = aspects.systems.map(s => {
            s.locations = s.locations.map(l => {
              if (l === r.id) return roomId;
              return l;
            });
            return s;
          });
        }
        return Object.assign({}, r, { id: roomId });
      });

      Object.keys(aspects).forEach(aspectName => {
        aspects[aspectName].forEach(a => {
          App[aspectName].push(new Classes[a.class](a));
        });
      });
      cb(null);
    });
    importZip.readEntry();
    importZip.on("entry", function(entry) {
      if (/^simulator\/assets/.test(entry.fileName)) {
        // It's an asset. If it is called default, load it.
        // Otherwise, rename it to the simid and load it.
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          readStream.on("end", function() {
            importZip.readEntry();
          });

          let filename = entry.fileName.replace("simulator/", "");
          const file = filename.split("/")[filename.split("/").length - 1];
          if (file.indexOf("default") === -1) {
            const extension = file.substr(file.lastIndexOf("."));
            filename = filename.replace(file, `${simId}${extension}`);
          }
          entry.fileName = `simulator/${filename}`;
          const directorypath = filename
            .split("/")
            .splice(0, filename.split("/").length - 1)
            .join("/");
          mkdirp.sync(`${assetDir}/${directorypath}`);
          const output = fs.createWriteStream(`${assetDir}/${filename}`);
          readStream.pipe(output);
          loadAsset(entry, /^simulator\/assets(\/.*)\/.*\..{3,}/gi);
        });
      } else if (/simulator\/simulator\.json/.test(entry.fileName)) {
        // Simulator
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const simulator = JSON.parse(str);
            simulator.id = simId;
            App.simulators.push(new Classes.Simulator(simulator));
            importZip.readEntry();
          });
        });
      } else if (/simulator\/.*\.json/.test(entry.fileName)) {
        // Aspects
        const aspectName = entry.fileName
          .replace("simulator/", "")
          .replace(".json", "");

        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const aspect = JSON.parse(str);
            aspect.forEach(a => {
              if (["decks", "rooms"].indexOf(aspectName) === -1) {
                a.id = uuid.v4();
              }
              a.simulatorId = simId;
              aspects[aspectName] = aspects[aspectName] || [];
              aspects[aspectName].push(a);
            });
            importZip.readEntry();
          });
        });
      }
    });
  });
}

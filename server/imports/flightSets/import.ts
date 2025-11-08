import yauzl from "yauzl";
import path from "path";
import paths from "../../helpers/paths";
import fs from "fs";
import App from "../../app";
import mkdirp from "mkdirp";
import * as Classes from "../../classes";

let assetDir = path.resolve("./");
if (process.env.NODE_ENV === "production") {
  assetDir = (paths as any).userData;
}

function streamToString(stream: NodeJS.ReadableStream, cb: (str: string) => void) {
  const chunks: string[] = [];
  stream.on("data", chunk => {
    chunks.push(chunk.toString());
  });
  stream.on("end", () => {
    cb(chunks.join(""));
  });
}

export default function ImportFlightSet(filepath: string, cb: (arg0: any) => void) {
  yauzl.open(filepath, {lazyEntries: true}, function (err, importZip) {
    if (err) throw err;
    importZip.on("close", function () {
      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function (entry) {
      if (/^flightSet\/assets\/.*/.test(entry.fileName)) {
        // Asset: write only if it doesn't already exist
        importZip.openReadStream(entry, function (error, readStream) {
          if (error) throw error;
          readStream.on("end", function () {
            importZip.readEntry();
          });
          const filename = entry.fileName.replace("flightSet/", "");
          const outPath = `${assetDir}/${filename}`;
          const directoryPath = outPath
            .split("/")
            .slice(0, -1)
            .join("/");
          mkdirp.sync(directoryPath);
          if (fs.existsSync(outPath)) {
            // Skip overwriting existing assets
            importZip.readEntry();
            return;
          }
          readStream.pipe(fs.createWriteStream(outPath));
        });
        return;
      }

      if (/flightSet\/flightSet\.json$/.test(entry.fileName)) {
        importZip.openReadStream(entry, function (error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const incoming = JSON.parse(str);
            const exists = (App as any).flightSets?.find((s: any) =>
              s.id === incoming.id ||
              (s.name || "").toLowerCase() === (incoming.name || "").toLowerCase(),
            );
            if (!exists) {
              (App as any).flightSets.push(new (Classes as any).FlightSet(incoming));
            }
            importZip.readEntry();
          });
        });
        return;
      }

      // Unhandled entry; continue
      importZip.readEntry();
    });
  });
}



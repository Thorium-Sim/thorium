import yauzl from "yauzl";
import App from "../../app";
import * as Classes from "../../classes";

function streamToString(stream, cb) {
  const chunks = [];
  stream.on("data", chunk => {
    chunks.push(chunk.toString());
  });
  stream.on("end", () => {
    cb(chunks.join(""));
  });
}

export default function ImportPanel(filepath, cb) {
  console.log("Importing panel");
  yauzl.open(filepath, { lazyEntries: true }, function(err, importZip) {
    if (err) throw err;
    importZip.on("close", function() {
      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function(entry) {
      if (/softwarePanel\/softwarePanel.json/.test(entry.fileName)) {
        // Mission
        importZip.openReadStream(entry, function(error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const panel = JSON.parse(str);
            if (App.softwarePanels.find(t => t.id === panel.id)) {
              App.softwarePanels = App.softwarePanels.filter(
                t => t.id !== panel.id
              );
            }
            App.softwarePanels.push(new Classes.SoftwarePanel(panel));
            importZip.readEntry();
          });
        });
      }
    });
  });
}

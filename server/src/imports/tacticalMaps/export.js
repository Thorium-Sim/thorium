import App from "../../app";
import yazl from "yazl";
import { exportTactical } from "../missions/export/showViewscreenTactical";

export default function exportTacticalMap(id, res) {
  const map = App.tacticalMaps.find(s => s.id === id);
  if (!map) {
    return res.end("No map");
  }
  const zipfile = new yazl.ZipFile();
  const keyBuff = new Buffer(JSON.stringify(map));
  zipfile.addBuffer(keyBuff, "tacticalMap/tacticalMap.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  exportTactical(zipfile, map, "tacticalMap");

  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${map.name}.tactical`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

import App from "../../app";
import yazl from "yazl";
export default function exportSoftwarePanel(id, res) {
  const panel = App.softwarePanels.find(s => s.id === id);
  if (!panel) {
    return res.end("No Panel");
  }
  const zipfile = new yazl.ZipFile();
  const panelBuff = new Buffer(JSON.stringify(panel));
  zipfile.addBuffer(panelBuff, "softwarePanel/softwarePanel.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${panel.name}.panel`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

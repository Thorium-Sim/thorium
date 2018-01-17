import App from "../../app";
import yazl from "yazl";
import { aspectList } from "../../events/flight";
import addAsset from "../addAsset";

export default function exportSimulator(simId, res) {
  const sim = App.simulators.find(s => s.id === simId);
  if (!sim) {
    return res.end("No simulator");
  }
  const zipfile = new yazl.ZipFile();
  const simBuff = new Buffer(JSON.stringify(sim));
  zipfile.addBuffer(simBuff, "simulator/simulator.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  // Add all of the systems and other stuff.
  aspectList.forEach(a => {
    if (a === "assetObjects") return;
    const aspects = App[a].filter(s => s.simulatorId === sim.id);
    if (aspects.length) {
      const aspectBuff = new Buffer(JSON.stringify(aspects));
      zipfile.addBuffer(aspectBuff, `simulator/${a}.json`, {
        mtime: new Date(),
        mode: parseInt("0100664", 8) // -rw-rw-r--
      });
    }
  });

  // Add all of the files for Docking Ports and the simulator itself
  App.assetObjects
    .filter(a => a.simulatorId === sim.id)
    .forEach(a => addAsset(a, zipfile, "simulator"));
  App.dockingPorts
    .filter(a => a.simulatorId === sim.id)
    .forEach(a => addAsset(a.image, zipfile, "simulator"));
  App.libraryDatabase
    .filter(a => a.simulatorId === sim.id)
    .forEach(a =>
      addAsset(
        a.image && (a.image.substr(0, a.image.lastIndexOf(".")) || a.image),
        zipfile,
        "simulator"
      )
    );
  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${sim.name}.sim`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

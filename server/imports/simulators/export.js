import App from "../../app";
import yazl from "yazl";
import { aspectList } from "../../events/flight";
import addAsset from "../addAsset";

aspectList.push("stationSets");

export default function exportSimulator(simId, res) {
  console.log("Starting");
  const sim = App.simulators.find(s => s.id === simId);
  if (!sim) {
    return res.end("No simulator");
  }
  console.log("got the sim");
  const zipfile = new yazl.ZipFile();
  const simBuff = new Buffer(JSON.stringify(sim));
  zipfile.addBuffer(simBuff, "simulator/simulator.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });
  console.log("added the simulator");
  // Add all of the systems and other stuff.
  aspectList.forEach(a => {
    console.log("adding ", a);
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
  console.log("adding asset objects");
  // Add all of the files for Docking Ports and the simulator itself
  App.assetObjects
    .filter(a => a.simulatorId === sim.id)
    .forEach(a => addAsset(a, zipfile, "simulator"));
  console.log("adding docking ports");

  App.dockingPorts
    .filter(a => a.simulatorId === sim.id)
    .forEach(a => addAsset(a.image, zipfile, "simulator"));
  console.log("adding library database");

  App.libraryDatabase
    .filter(a => a.simulatorId === sim.id)
    .forEach(a =>
      addAsset(
        a.image && (a.image.substr(0, a.image.lastIndexOf(".")) || a.image),
        zipfile,
        "simulator"
      )
    );
  console.log("ending");
  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${sim.name}.sim`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

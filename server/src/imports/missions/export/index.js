import updateViewscreenComponent from "./updateViewscreenComponent";
import setArmyContacts from "./setArmyContacts";
import showViewscreenTactical from "./showViewscreenTactical";
import playSound from "./playSound";
import App from "../../../app";
import yazl from "yazl";

export default function exportMissions(missionId, res) {
  const mission = App.missions.find(m => m.id === missionId);
  if (!mission) {
    return res.end("No mission");
  }
  const zipfile = new yazl.ZipFile();
  // Get all of the timeline steps.
  const tacticals = [];
  mission.timeline.forEach(t =>
    t.timelineItems.forEach(i => {
      updateViewscreenComponent(zipfile, i);
      setArmyContacts(zipfile, i);
      playSound(zipfile, i);
      const tac = showViewscreenTactical(zipfile, i);
      tac && tacticals.push(tac);
    })
  );

  // Add the tacticals to the zip file
  if (tacticals.length > 0) {
    const tacticalBuff = new Buffer(JSON.stringify(tacticals));
    zipfile.addBuffer(tacticalBuff, "mission/tacticals.json", {
      mtime: new Date(),
      mode: parseInt("0100664", 8) // -rw-rw-r--
    });
  }
  // Add the mission to the zip file
  const missionBuff = new Buffer(JSON.stringify(mission));
  zipfile.addBuffer(missionBuff, "mission/mission.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${mission.name}.misn`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

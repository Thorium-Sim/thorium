import updateViewscreenComponent from "./updateViewscreenComponent";
import setArmyContacts from "./setArmyContacts";
import showViewscreenTactical from "./showViewscreenTactical";
import App from "../../app";
import yazl from "yazl";

export default function exportMissions(missionId, res) {
  const mission = App.missions.find(m => m.id === missionId);
  if (!mission) {
    return res.end("No mission");
  }
  const zipfile = new yazl.ZipFile();
  updateViewscreenComponent(zipfile, mission);
  setArmyContacts(zipfile, mission);
  showViewscreenTactical(zipfile, mission);
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

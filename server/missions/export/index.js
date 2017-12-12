import updateViewscreenComponent from "./updateViewscreenComponent";
import setArmyContacts from "./setArmyContacts";
import showViewscreenTactical from "./showViewscreenTactical";
import App from "../../app";
import yazl from "yazl";
import fs from "fs";

export default function exportMissions(missionId) {
  const mission = App.missions.find(m => m.id === missionId);
  var zipfile = new yazl.ZipFile();
  const file = fs.createWriteStream("./test.zip");
  updateViewscreenComponent(zipfile, mission);
  setArmyContacts(zipfile, mission);
  showViewscreenTactical(zipfile, mission);
  // Add the mission to the zip file
  const missionBuff = new Buffer(JSON.stringify(mission));
  zipfile.addBuffer(missionBuff, "mission/mission.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  zipfile.end();
  zipfile.outputStream.pipe(file);
}

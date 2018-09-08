import App from "../../app";
import yazl from "yazl";
import updateViewscreenComponent from "../missions/export/updateViewscreenComponent";
import setArmyContacts from "../missions/export/setArmyContacts";
import showViewscreenTactical from "../missions/export/showViewscreenTactical";
import playSound from "../missions/export/playSound";

export default function exportKeyboard(id, res) {
  const keyboard = App.keyboards.find(s => s.id === id);
  if (!keyboard) {
    return res.end("No keyboard");
  }
  const zipfile = new yazl.ZipFile();
  const keyBuff = new Buffer(JSON.stringify(keyboard));
  zipfile.addBuffer(keyBuff, "keyboard/keyboard.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });

  // Gather the assets
  const tacticals = [];
  keyboard.keys.forEach(k => {
    k.actions.forEach(i => {
      updateViewscreenComponent(zipfile, i, "keyboard");
      setArmyContacts(zipfile, i, "keyboard");
      playSound(zipfile, i, "keyboard");
      const tac = showViewscreenTactical(zipfile, i, "keyboard");
      tac && tacticals.push(tac);
    });
  });

  // Add the tacticals to the zip file
  if (tacticals.length > 0) {
    const tacticalBuff = new Buffer(JSON.stringify(tacticals));
    zipfile.addBuffer(tacticalBuff, "mission/tacticals.json", {
      mtime: new Date(),
      mode: parseInt("0100664", 8) // -rw-rw-r--
    });
  }

  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${keyboard.name}.keyboard`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

import App from "../../app";
import yazl from "yazl";
import updateViewscreenComponent from "../missions/export/updateViewscreenComponent";
import setArmyContacts from "../missions/export/setArmyContacts";
import showViewscreenTactical from "../missions/export/showViewscreenTactical";
import playSound from "../missions/export/playSound";

export default function exportTrigger(id, res) {
  const trigger = App.triggerGroups.find(s => s.id === id);
  if (!trigger) {
    return res.end("No trigger");
  }
  const zipfile = new yazl.ZipFile();
  const keyBuff = Buffer.from(JSON.stringify(trigger));
  zipfile.addBuffer(keyBuff, "trigger/trigger.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });
  const actions = trigger.components
    .map(c => c.component.name)
    .filter((a, i, arr) => arr.indexOf(a) === i);

  const macros = actions.reduce(
    (prev, a) =>
      prev.concat(
        trigger
          .getTriggerActions(a)
          .reduce((prev, t) => prev.concat(t.macros), [])
      ),
    []
  );
  // Gather the assets
  const tacticals = [];
  macros.forEach(i => {
    updateViewscreenComponent(zipfile, i, "trigger");
    setArmyContacts(zipfile, i, "trigger");
    playSound(zipfile, i, "trigger");
    const tac = showViewscreenTactical(zipfile, i, "trigger");
    tac && tacticals.push(tac);
  });

  // Add the tacticals to the zip file
  if (tacticals.length > 0) {
    const tacticalBuff = new Buffer(JSON.stringify(tacticals));
    zipfile.addBuffer(tacticalBuff, "trigger/tacticals.json", {
      mtime: new Date(),
      mode: parseInt("0100664", 8) // -rw-rw-r--
    });
  }

  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${trigger.name}.trigger`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}

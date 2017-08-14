import electron from "electron";
const fs = require("fs");
const ncp = require("ncp").ncp;
if (electron.app) {
  const assetFolder = electron.app.getPath("appData") + "/thorium/assets";
  if (!fs.existsSync(assetFolder)) {
    ncp(electron.app.getAppPath() + "/assets", assetFolder, function(err) {
      if (err) {
        throw new Error(err);
      }
      electron.dialog.showErrorBox(
        "Assets have been installed",
        "Assets for Thorium have been installed in your application support folder for Thorium."
      );
    });
  }
}

const triggerWindow = require("./triggerWindow");
const http = require("http");
const {clearMenubar, setMenubar} = require('./setMenubar');
module.exports = function loadPage(uri, mainWindow) {
  return new Promise((resolve, reject) => {
    const url = uri
      .replace("https://", "")
      .replace("http://", "")
      .replace("/client", "");
    http
      .get(`http://${url}/client`, res => {
        if (res.statusCode !== 200) {
setMenubar(mainWindow);
          return reject();
        
        } else {
          mainWindow && mainWindow.loadURL(`http://${url}/client`);
          triggerWindow(mainWindow);
          clearMenubar();
          return resolve();
        }
      })
      .on("error", e => {
        // It failed. Go back to the main screen.
        console.error(`Got error: ${e.message}`);
        setMenubar(mainWindow);
        return reject();
      });
  });
};

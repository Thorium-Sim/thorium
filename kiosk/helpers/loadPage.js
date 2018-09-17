const triggerWindow = require("./triggerWindow");
const http = require("http");

module.exports = function loadPage(uri, mainWindow) {
  return new Promise((resolve, reject) => {
    const url = uri
      .replace("https://", "")
      .replace("http://", "")
      .replace("/client", "");
    http
      .get(`http://${url}/client`, res => {
        if (res.statusCode !== "200") {
          return reject();
        } else {
          mainWindow && mainWindow.loadURL(uri);
          triggerWindow(mainWindow);
          return resolve();
        }
      })
      .on("error", e => {
        // It failed. Go back to the main screen.
        console.error(`Got error: ${e.message}`);
        return reject();
      });
  });
};

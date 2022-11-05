const triggerWindow = require("./triggerWindow");
const http = require("http");
const https = require("https");
const {clearMenubar, setMenubar} = require("./setMenubar");
const {windows, addWindow} = require("./multiWindow");
const {setLoadedUrl} = require("./loadedUrl");
const initHotkeys = require("./hotkeys");
const initRemote = require("./remote");

function openPage(url, kiosk) {
  setLoadedUrl(`${url}/client`);
  for (let i = windows.length - 1; i >= 0; i--) {
    if (windows[i] && windows[i].isDestroyed()) {
      windows.splice(i, 1);
    }
  }
  if (windows.length === 0) {
    addWindow({
      main: false,
      x: 500,
      y: 500,
      loadedUrl: `${url}/client`,
      server: false,
    });
    initHotkeys();
    initRemote();
    return;
  }
  windows.forEach(mainWindow => {
    mainWindow && mainWindow.loadURL(`${url}/client`);
    triggerWindow(mainWindow, kiosk);
  });
  if (kiosk) {
    clearMenubar();
  }
}
module.exports = function loadPage(uri, kiosk) {
  return new Promise((resolve, reject) => {
    let url = uri.replace("/client", "");
    if (!url.includes("http")) {
      url += "http://";
    }
    let httpHandler = http;
    let agent = new http.Agent({});
    if (url.includes("https")) {
      httpHandler = https;
      agent = new https.Agent({rejectUnauthorized: false});
    }
    httpHandler
      .get(`${url}/client`, {agent}, () => {
        openPage(url, kiosk);
        return resolve();
      })
      .on("error", e => {
        // It failed. Try again.
        let newUrl = url;
        // We probably mismatched HTTPS. Try it with the opposite.
        if (newUrl.includes("https")) {
          newUrl = newUrl.replace("https", "http");
        } else {
          newUrl = newUrl.replace("http", "https");
        }

        let httpHandler = http;
        let agent = new http.Agent({});
        if (newUrl.includes("https")) {
          httpHandler = https;
          agent = new https.Agent({rejectUnauthorized: false});
        }

        httpHandler
          .get(`${newUrl}/client`, {agent}, () => {
            openPage(newUrl, kiosk);
            return resolve();
          })
          .on("error", e => {
            return reject(e);
          });
      });
  }).catch(err => {
    // Tried too many times. Give up.
    setMenubar();
    return Promise.reject(err);
  });
};

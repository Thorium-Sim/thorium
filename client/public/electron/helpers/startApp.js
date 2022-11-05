const {app, BrowserWindow, ipcMain, shell} = require("electron");
const fs = require("fs");
const path = require("path");

// Make the kiosk work better on slightly older computers
app.commandLine.appendSwitch("ignore-gpu-blacklist", "true");
const cert = fs.existsSync(
  `${require("os").homedir()}/Documents/thorium/server.cert`,
)
  ? fs.readFileSync(
      `${require("os").homedir()}/Documents/thorium/server.cert`,
      "utf8",
    )
  : fs.readFileSync(path.resolve(`${__dirname}/../../server.cert`), "utf8");

const settings = require("electron-settings");

module.exports = () => {
  function startServer() {
    // Stop the bonjour  browser
    const {bonjour} = require("./bonjour");
    bonjour.stop();
    const {addWindow} = require("./multiWindow");
    addWindow({server: true});
  }
  app.enableSandbox();
  app.on("ready", function () {
    let port = process.env.PORT || settings.get("port") || 4444;
    let httpOnly =
      process.env.HTTP_ONLY === "true" ||
      settings.get("httpOnly") === true ||
      settings.get("httpOnly") === undefined;

    const autoUpdateInit = require("./autoUpdate");
    autoUpdateInit();

    app.on(
      "certificate-error",
      (event, webContents, url, error, certificate, callback) => {
        // On certificate error we disable default behaviour (stop loading the page)
        // and we then say "it is all fine - true" to the callback
        event.preventDefault();
        callback(certificate.data === cert);
      },
    );
    const {checkWindow} = require("./multiWindow");
    checkWindow();
    const {addWindow} = require("./multiWindow");
    addWindow({main: true});
    ipcMain.on("getWindowCount", event => {
      event.returnValue = BrowserWindow.getAllWindows().filter(b => {
        return b.isVisible();
      }).length;
    });
    ipcMain.on("loadPage", function (evt, data) {
      const {url: loadUrl, auto, kiosk} = data;
      if (auto) {
        settings.set("autostart", loadUrl);
      }
      require("./loadPage")(loadUrl, kiosk).catch(err => {
        console.error(err);
        settings.set("autostart", null);
        const {bonjour} = require("./bonjour");
        bonjour.start();
      });
    });
    ipcMain.handle("getServerAutostart", async () => {
      return settings.get("autostart") === "server";
    });
    ipcMain.on("setServerAutostart", async (evt, auto) => {
      return settings.set("autostart", auto ? "server" : false);
    });
    ipcMain.on("cancelServerAutostart", async () => {
      settings.set("autostart", false);
      app.relaunch();
      app.exit(0);
      return;
    });
    ipcMain.on("startServer", function (evt, auto) {
      startServer();
    });

    ipcMain.on("open-external", async (event, url) => {
      shell.openExternal(url);
    });
    ipcMain.handle("get-ipAddress", async () => {
      const ipAddress = require("./ipaddress");
      return ipAddress;
    });
    ipcMain.handle("get-usbDevices", async () => {
      const usbDetect = require("usb-detection");
      return usbDetect.find(0x403, 0x6001);
    });
    ipcMain.on("activate-dmx", (event, config) => {
      const dmx = require("./dmx");
      dmx.activate(config);
    });
    ipcMain.on("send-dmx-value", (event, universe) => {
      const dmx = require("./dmx");
      dmx.sendData(universe);
    });
    ipcMain.handle("get-hostname", async () => {
      return require("os").hostname();
    });
    ipcMain.handle("get-port", async () => {
      return {port, httpOnly};
    });
    ipcMain.on("set-port", (event, value) => {
      settings.set("port", value);
      port = value;
    });
    ipcMain.on("set-httpOnly", (event, value) => {
      settings.set("httpOnly", value);
      httpOnly = value;
    });
    if (settings.get("autostart")) {
      // Check to see if the page will work.
      const loadUrl = settings.get("autostart");
      if (loadUrl === "server") {
        startServer();
      } else {
        // Do a fetch
        require("./loadPage")(loadUrl, true).catch(() => {
          settings.set("autostart", null);
          const {bonjour} = require("./bonjour");
          bonjour.start();
        });
      }
    } else {
      const {bonjour} = require("./bonjour");
      bonjour.start();
    }
    require("./setMenubar").setMenubar();
    app.on("window-all-closed", function () {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      app.quit();
    });
  });
};

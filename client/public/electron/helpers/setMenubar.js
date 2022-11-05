const {Menu, BrowserWindow, app} = require("electron");
const {windows, addWindow} = require("./multiWindow");
const {getLoadedUrl} = require("./loadedUrl");

function templateFunc() {
  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:",
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Alt+Q",
          click: function () {
            app.quit();
          },
        },
      ],
    },
    {
      label: "File",
      submenu: [
        {
          label: "New Window",
          accelerator: "CmdOrCtrl+N",
          click: function () {
            addWindow({loadedUrl: getLoadedUrl()});
          },
        },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+Alt+R",
          click: function () {
            windows.forEach(mainWindow => {
              if (!mainWindow.isDestroyed()) {
                mainWindow.reload();
              }
            });
          },
        },

        {
          label: "Kiosk",
          accelerator: "CmdOrCtrl+Alt+K",
          click: function () {
            if (
              windows[0] &&
              !windows[0].isDestroyed() &&
              windows[0].isKiosk()
            ) {
              windows.forEach(mainWindow => {
                if (!mainWindow.isDestroyed()) {
                  mainWindow.setKiosk(false);
                  setMenubar();
                }
              });
            } else {
              windows.forEach(mainWindow => {
                if (!mainWindow.isDestroyed()) {
                  mainWindow.setKiosk(true);

                  clearMenubar();
                }
              });
            }
          },
        },
        {
          label: "Dev Tools",
          accelerator: "CmdOrCtrl+Alt+I",
          click: function () {
            const focused = BrowserWindow.getFocusedWindow();
            focused && focused.webContents.openDevTools();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
        {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
        {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:",
        },
      ],
    },
  ];
  return template;
}

function setMenubar() {
  const template = templateFunc();
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  windows.forEach(w => {
    if (!w.isDestroyed()) {
      w.setMenuBarVisibility(true);
      w.autoHideMenuBar = false;
    }
  });
}

function clearMenubar() {
  Menu.setApplicationMenu(null);
}

module.exports.setMenubar = setMenubar;

module.exports.clearMenubar = clearMenubar;

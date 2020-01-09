const ipcRenderer = require("electron").ipcRenderer;
const webFrame = require("electron").webFrame;
const shell = require("electron").shell;
const ipAddress = require("./ipaddress");
const mac = require("./macaddress");
const settings = require("electron-settings");
const semver = require("semver");
const isLinux = require("is-linux");
const isOsx = require("is-osx");
const isWindows = require("is-windows");
let port = process.env.PORT || settings.get("port") || 443;
let httpOnly =
  process.env.HTTP_ONLY || settings.get("httpOnly") === "true" || false;

let browserCount = require("electron").remote.getCurrentWindow().browserCount;

const key = "thorium_clientPersistentId";
let clientId = sessionStorage.getItem(key);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

setClientId(
  `${require("os").hostname()}${browserCount > 1 ? ` (${browserCount})` : ""}`,
);

function setClient(id) {
  sessionStorage.setItem(key, id);
  localStorage.setItem("thorium_clientId", id);
  clientId = id;
}

function setClientId(id) {
  const clientList = getClientList();
  const clientIndex = clientList.indexOf(clientId);
  setClient(id);
  clientList[clientIndex] = id;
  localStorage.setItem(key, JSON.stringify(clientList));
}

function getClientList() {
  let clientList = null;
  try {
    clientList = JSON.parse(localStorage.getItem(key));
  } catch {
    // It errored - it either doesn't exist or isn't JSON.
    // If it's blank, create a new one
  }
  if (!clientList) {
    clientList = [localStorage.getItem(key) || require("os").hostname()];
    localStorage.setItem(key, JSON.stringify(clientList));
  }
  return clientList;
}

document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("thorium_startKiosked") !== "false") {
    if (document.getElementById("start-kiosked")) {
      document.getElementById("start-kiosked").checked = true;
    }
  }
});

window.loadPage = function loadPage(url) {
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  let kiosk = document.getElementById("start-kiosked").checked;
  localStorage.setItem("thorium_startKiosked", kiosk);
  ipcRenderer.send("loadPage", {url, auto, kiosk});
  return;
};
window.startServer = function startServer() {
  let auto = false;
  if (document.getElementById("remember-server").checked) auto = true;
  ipcRenderer.send("startServer", auto);
  return;
};
function printUrl() {
  return `http${httpOnly ? "" : "s"}://localhost${
    (port === 443 && !httpOnly) || (port === 80 && httpOnly) ? "" : `:${port}`
  }`;
}

window.openBrowser = function openBrowser() {
  shell.openExternal(printUrl());
  return;
};
window.getServers = function() {
  ipcRenderer.send("getServers");
};
window.serverAddress = function serverAddress() {
  let url = document
    .getElementById("server-address")
    .value.replace("/client", "");
  if (url.indexOf(":") === -1) url = `${url}:${port}`;
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  ipcRenderer.send("loadPage", {url, auto});
};
ipcRenderer.on("info", function(event, data) {
  const output = document.getElementById("console");
  if (output) {
    output.innerText = `${data}\n${output.innerText}`;
  }
});

const thorium = {
  sendMessage: function(arg) {
    return ipcRenderer.send("remoteMessage", arg);
  },
  ipAddress: ipAddress,
  port: port,
  httpOnly: httpOnly,
  mac: mac,
};

document.addEventListener(
  "DOMContentLoaded",
  function() {
    // Network Settings
    const httpOnlyEl = document.getElementById("http-only");
    httpOnlyEl.checked = httpOnly;

    httpOnlyEl.addEventListener("change", e => {
      settings.set("httpOnly", String(e.target.checked));
      httpOnly = e.target.checked;
      thorium.httpOnly = e.target.checked;
    });
    const portEl = document.getElementById("port");
    portEl.value = port;

    portEl.addEventListener("change", e => {
      settings.set("port", e.target.value);
      port = e.target.value;
      thorium.port = e.target.value;
    });

    // Auto Update
    const autoUpdateEl = document.getElementById("auto-update");
    const autoUpdateLabel = document.getElementById("auto-update-label");
    const autoUpdateButton = document.getElementById("auto-update-download");
    const autoUpdateProgress = document.getElementById("download-progress");

    fetch("https://api.github.com/repos/thorium-sim/thorium/releases")
      .then(res => res.json())
      .then(res => {
        console.log(res[0]);
        if (
          semver.gt(res[0].tag_name, require("../../package.json").version) &&
          semver(res[0].tag_name).prerelease.length === 0
        ) {
          autoUpdateLabel.innerText = `Your version of Thorium is outdated. Current version is ${
            res[0].tag_name
          }. Your version is ${require("../../package.json").version}`;
          autoUpdateEl.classList.add("shown");

          const asset = res[0].assets.find(
            c =>
              (isLinux && c.name.includes("AppImage")) ||
              (isWindows && c.name.includes("win.zip")) ||
              (isOsx && c.name.includes("mac.zip")),
          );
          if (!asset) {
            autoUpdateButton.hidden = true;

            return;
          }
          const url = asset.browser_download_url;
          autoUpdateButton.addEventListener("click", () => {
            ipcRenderer.send("downloadAutoUpdate", {url});
            ipcRenderer.on("download-progress", function(e, progress) {
              autoUpdateProgress.value = progress;
            });
            ipcRenderer.on("download-complete", function() {
              autoUpdateLabel.innerText = `Update Complete!`;
              autoUpdateProgress.hidden = true;
            });
            autoUpdateLabel.innerText = `Update is being downloaded to your downloads folder in the background... Please wait.`;
            autoUpdateButton.hidden = true;
            autoUpdateProgress.hidden = false;
          });
        }
      })
      .catch(() => {
        //Oh well.
      });
  },
  false,
);

ipcRenderer.on("clearUrl", function() {
  localStorage.setItem("thorium_url", "");
});

ipcRenderer.on("updateServers", function updateServers(e, servers) {
  if (document.getElementById("loading")) {
    if (servers.length === 0) {
      document.getElementById("loading").classList.remove("hidden");
      document.getElementById("servers").classList.add("hidden");
    } else {
      document.getElementById("loading").classList.add("hidden");
      document.getElementById("servers").classList.remove("hidden");
    }
    const markup = servers.map(
      s => `<button onclick="loadPage('${s.url}')">${s.name}</button>`,
    );
    document.getElementById("serverList").innerHTML = markup;
  }
});

window.thorium = thorium;

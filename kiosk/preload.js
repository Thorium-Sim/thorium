const ipcRenderer = require("electron").ipcRenderer;
const webFrame = require("electron").webFrame;
const ipAddress = require("../helpers/ipAddress").default;

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

localStorage.setItem("thorium_clientId", require("os").hostname());

window.loadPage = function loadPage(url) {
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  ipcRenderer.send("loadPage", { url, auto });
  return;
};
window.startServer = function startServer() {
  let auto = false;
  if (document.getElementById("remember-server").checked) auto = true;
  ipcRenderer.send("startServer", auto);
  return;
};
window.openBrowser = function openBrowser() {
  ipcRenderer.send("openBrowser");
  return;
};
window.getServers = function() {
  ipcRenderer.send("getServers");
};
window.serverAddress = function serverAddress() {
  let url = document
    .getElementById("server-address")
    .value.replace("/client", "");
  if (url.indexOf(":") === -1) url = url + ":1337";
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  ipcRenderer.send("loadPage", { url, auto });
};
ipcRenderer.on("updateReady", function() {
  // changes the text of the button
  var container = document.getElementById("ready");
  container.classList.remove("hidden");
});
ipcRenderer.on("info", function(event, data) {
  const output = document.getElementById("console");
  if (output) {
    output.innerText = `${data}\n${output.innerText}`;
  }
});

const thorium = {
  sendMessage: function(arg) {
    return ipcRenderer.sendSync("synchronous-message", arg);
  },
  ipAddress: ipAddress
};

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
      s => `<button onclick="loadPage('${s.url}')">${s.name}</button>`
    );
    document.getElementById("serverList").innerHTML = markup;
  }
});

window.thorium = thorium;

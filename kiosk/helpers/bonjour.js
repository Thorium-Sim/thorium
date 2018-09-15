const bonjour = require("bonjour")();

module.exports = function startBonjour(mainWindow) {
  const browser = bonjour.find({ type: "thorium-http" }, newService);
  const servers = [];
  function newService(service) {
    if (
      service.name.indexOf("Thorium") > -1 ||
      service.type === "thorium-http" ||
      service.type === "local"
    ) {
      const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi;
      const address = service.addresses.find(a => ipregex.test(a));
      const uri = `http://${address}:${service.port}/client`;
      servers.push({
        name: service.host,
        url: uri
      });
    }
  }
  function sendUpdate() {
    if (
      mainWindow &&
      mainWindow.webContents &&
      mainWindow.webContents.getURL().indexOf("client") === -1
    ) {
      mainWindow.webContents.send("updateServers", servers);
    }
    setTimeout(sendUpdate, 1000);
  }
  sendUpdate();
  return browser;
};

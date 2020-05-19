const {ipcMain} = require("electron");
const bonjour = require("bonjour")();

function printUrl(address, httpOnly, port) {
  return `http${httpOnly ? "" : "s"}://${address}${
    (port === 443 && !httpOnly) || (port === 80 && httpOnly) ? "" : `:${port}`
  }`;
}

class Bonjour {
  constructor() {
    this.browser = null;
  }
  start() {
    this.browser = bonjour.find({type: "thorium-http"}, newService);
    const servers = [];
    function newService(service) {
      if (
        service.name.indexOf("Thorium") > -1 ||
        service.type === "thorium-http" ||
        service.type === "local"
      ) {
        const isHttps = service.txt.https === "true";
        const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi;
        const address = service.addresses.find(a => ipregex.test(a));

        const uri = `${printUrl(address, !isHttps, service.port)}/client`;
        servers.push({
          name: service.host,
          url: uri,
        });
      }
    }
    ipcMain.on("getServers", function (event) {
      event.sender.send("updateServers", servers);
    });
  }
  stop() {
    this.browser && this.browser.stop();
  }
}

module.exports.bonjour = new Bonjour();

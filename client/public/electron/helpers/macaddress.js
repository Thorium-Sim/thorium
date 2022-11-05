var os = require("os");
var ifaces = os.networkInterfaces();
var mac = "00:00:00:00:00:00";
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if (iface.family !== "IPv4" || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      mac = iface.mac;
    } else {
      // this interface has only one ipv4 adress
      mac = iface.mac;
    }
    ++alias;
  });
});

module.exports = mac;

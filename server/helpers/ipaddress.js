var os = require("os");
var ifaces = os.networkInterfaces();
var ipAddress = "localhost";
Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      ipAddress = iface.address;
    } else {
      // this interface has only one ipv4 adress
      ipAddress = iface.address;
    }
    ++alias;
  });
});

export default ipAddress;

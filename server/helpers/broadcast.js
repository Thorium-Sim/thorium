import { Discovery } from "udp-discovery";
import ipAddress from "./ipaddress";

const discover = new Discovery();

discover.on("available", function(name, data, reason) {
  discover.sendEvent("ClientConnect", { address: ipAddress, port: 3000 });
});

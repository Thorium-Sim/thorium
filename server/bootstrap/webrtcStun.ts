import Turn from "node-turn";
import ipaddress from "../helpers/ipaddress";

export async function startStun() {
  const server = new Turn({
    // set options
    authMech: "none",
    listeningIps: [ipaddress],
    relayIps: [ipaddress],
  });
  server.start();
}

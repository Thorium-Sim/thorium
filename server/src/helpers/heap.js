import throttle from "./throttle";
import fetch from "node-fetch";

// Analytics Package

const ignoredEvents = [
  // Exclude events that might include sensitive information
  "addCoreFeed",
  "addLog",
  "clientLogin",
  "clientSetStation",
  "clientConnect",
  "toggleAutoUpdate",
  "triggerAutoUpdate",
  "setTrackingPreference",
  "importTaskTemplates",
  "setSpaceEdventuresToken",
  "assignSpaceEdventuresFlightRecord",
  "assignSpaceEdventuresBadge",
  "assignSpaceEdventuresMission",
  "getSpaceEdventuresLogin",
  "googleSheetsAuthorize",
  "googleSheetsCompleteAuthorize",
  "googleSheetsRevoke",
  "googleSheetsFileSearch",
  "googleSheetsAppendData",

  // Exclude events that don't mean much and happen a lot.
  "addHeat",
  "reactorBatteryChargeLevel",
  "directionUpdate",
  "setPhaserBeamCharge",
  "engineCool",
  "setPhaserBeamHeat",
  "shieldFrequencySet",
  "cancelCoolantTransfer",
  "updateCommandLine",
  "updateTimelineStepItem",
  "rotationUpdate",
  "rotationSet",
  "stopPhaserBeams",
  "updateTacticalMapItem",
  "triggerKeyboardAction"
];
let uploadBatch = [];

const url = `${
  process.env.NODE_ENV === "production"
    ? "https://us-central1-thorium-sim.cloudfunctions.net/"
    : "http://localhost:5000/thorium-sim/us-central1/"
}logEvent`;

const sendData = throttle(() => {
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer thorium-secret-key-062458"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(uploadBatch) // body data type must match "Content-Type" header
  }).catch(err => {});
  uploadBatch = [];
}, 1000 * 60);

class Heap {
  stubbed = false;
  track(event, thoriumId, params = {}, context = {}) {
    if (this.stubbed) return;
    if (ignoredEvents.includes(event)) return;

    // Get information from the context
    const simulatorName = context.simulator && context.simulator.name;
    const flightName = context.flight && context.flight.name;
    const clientName = context.client && context.client.name;
    const stationName = context.client && context.client.station;
    const { cb, ...data } = params;
    const output = {
      ...data,
      event,
      thoriumId,
      simulatorName,
      flightName,
      clientName,
      stationName,
      thoriumVersion: require("../../package.json").version
    };
    Object.keys(output).forEach(
      key => output[key] == null && delete output[key]
    );
    uploadBatch.push(output);
    sendData();
  }
}

const heap = new Heap();

export default heap;

const DMX = require("dmx");
const e131 = require("e131");
const dmx = new DMX();

class DMXController {
  activate({dmxDriver, ipAddress, device, universe}) {
    const universeValue = isNaN(parseInt(universe, 10))
      ? 1
      : parseInt(universe, 10);
    // Clear out the universe stuff
    if (this?.universe?.stop) this.universe.stop();
    if (this?.universe?.close) this.universe.close(() => {});
    this.universe = null;
    this.packet = null;
    this.slots = null;

    // Initialize new stuff
    this.driver = dmxDriver;
    this.ipAddress = ipAddress;
    this.device = device;
    if (dmxDriver === "sacn") {
      this.universe = new e131.Client(ipAddress);
      this.packet = this.universe.createPacket(512);
      this.slots = this.packet.getSlotsData();
      this.packet.setUniverse(universeValue);
    } else {
      this.universe = dmx.addUniverse(
        "universe-1",
        dmxDriver,
        dmxDriver === "artnet" ? ipAddress : device,
        {universe: universeValue},
      );
    }
  }
  sendData(universe) {
    if (!this.universe) return;
    if (this.driver === "sacn") {
      for (let i = 0; i < this.slots.length; i++) {
        this.slots[i] = Math.round(Math.min(255, Math.max(0, universe[i])));
      }
      this.universe.send(this.packet);
    } else {
      const channels = [];
      for (let i = 0; i < 512; i++) {
        channels[i + 1] =
          Math.round(Math.min(255, Math.max(0, universe[i]))) || 0;
      }
      dmx.update("universe-1", channels);
    }
  }
}

module.exports = new DMXController();

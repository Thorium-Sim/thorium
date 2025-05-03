const {findBySerialNumber, WebUSBDevice} = require("usb");
const e131 = require("e131");

class DMXController {
  async activate({dmxDriver, ipAddress, device, universe}) {
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
      const serialDevice = await findBySerialNumber(device);
      const lightingDevice = await WebUSBDevice.createInstance(serialDevice);

      await lightingDevice.open();
      await lightingDevice.claimInterface(0);

      await lightingDevice.controlTransferOut({
        // It's a USB class request
        requestType: "class",
        // The destination of this request is the interface
        recipient: "interface",
        // CDC: Communication Device Class
        // 0x22: SET_CONTROL_LINE_STATE
        // RS-232 signal used to tell the USB device that the computer is now present.
        request: 0x22,
        // Yes
        value: 0x01,
        // Interface #0
        index: 0x00,
      });
      const universe = new Array(512).fill(0);

      // This only supports ENTTEC Pro devices
      const ENTTEC_PRO_DMX_STARTCODE = 0x00;
      const ENTTEC_PRO_START_OF_MSG = 0x7e;
      const ENTTEC_PRO_END_OF_MSG = 0xe7;
      const ENTTEC_PRO_SEND_DMX_RQ = 0x06;

      const header = [
        ENTTEC_PRO_START_OF_MSG,
        ENTTEC_PRO_SEND_DMX_RQ,
        universe.length & 0xff,
        (universe.length >> 8) & 0xff,
        ENTTEC_PRO_DMX_STARTCODE,
      ];

      // Initialize a blank universe
      await lightingDevice.transferOut(
        2,
        Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
      );

      this.universe = {
        close: async () => {
          await lightingDevice.close();
        },
        send: async channels => {
          // Make sure we're sending 512 channels
          for (let i = 0; i < 512; i++) {
            universe[i] = Math.round(channels[i]) || 0;
          }
          // Send the message
          if (lightingDevice.opened) {
            return await lightingDevice.transferOut(
              2,
              Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
            );
          }
          return Promise.resolve();
        },
      };
    }
  }
  async sendData(universe) {
    if (!this.universe) return;
    if (this.driver === "sacn") {
      for (let i = 0; i < this.slots.length; i++) {
        this.slots[i] = Math.round(Math.min(255, Math.max(0, universe[i])));
      }
      await this.universe.send(this.packet);
    } else {
      await this.universe.send(universe);
    }
  }
}

module.exports = new DMXController();

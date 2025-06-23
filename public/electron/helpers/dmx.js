const {findBySerialNumber} = require("usb");
const {bmRequestType, DIRECTION, RECIPIENT, TYPE} = require("bmrequesttype");

const e131 = require("e131");

class DMXController {
  async activate({dmxDriver, ipAddress, device, universe}, attempt = 0) {
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
      try {
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

        async function openDevice(serial) {
          async function getDevice() {
            const device = await findBySerialNumber(serial);

            device.open();
            device.interface(0).claim();
            device.controlTransfer(
              bmRequestType(DIRECTION.Out, TYPE.Class, RECIPIENT.Interface),
              0x22,
              0x01,
              0x00,
              Buffer.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
            );
            const endpoint = device.interface(0).endpoint(2);
            return {device, endpoint};
          }
          let device = await getDevice();
          return {
            send: async message => {
              try {
                await device.endpoint.transferAsync(message);
              } catch {
                device.device.close();
                device = await getDevice();
              }
            },
            close: async () => {
              device.device.close();
            },
          };
        }

        let lightingDevice = await openDevice(
          device.replace("/dev/cu.usbserial-", ""),
        );
        let closing = false;
        this.universe = {
          close: async (attempt = 0) => {
            try {
              closing = true;
              await lightingDevice.close();
            } catch (error) {
              if (attempt > 3) throw error;
              await new Promise(res => setTimeout(res, 1000));
              try {
                await lightingDevice.close();
              } catch {
                await new Promise(res => setTimeout(res, 1000));
                await lightingDevice.close();
              }
            }
          },
          send: async channels => {
            if (closing === true) return;
            // Make sure we're sending 512 channels
            for (let i = 0; i < 512; i++) {
              universe[i] = Math.round(channels[i]) || 0;
            }
            // Send the message
            return await lightingDevice.send(
              Buffer.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
            );
          },
        };
      } catch (error) {
        console.error("DMX Activation error", error);
        // We'll try activating again after a delay
        if (attempt > 3) throw error;
        await new Promise(res => setTimeout(res, 1000));
        this.activate({dmxDriver, ipAddress, device, universe}, attempt + 1);
      }
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
  close() {
    if (!this.universe) return;
    this.universe?.close();
  }
}

module.exports = new DMXController();

import React from "react";

declare global {
  interface Navigator {
    // This USB type comes from @types/w3c-web-usb
    readonly usb: USB;
  }
}

interface DMXDevice {
  ready: boolean;
  close: () => Promise<void>;
  update: (channels: number[]) => Promise<USBOutTransferResult | void>;
}
async function setUpLightingDevice(): Promise<DMXDevice> {
  const lightingDevice = await navigator.usb.requestDevice({
    filters: [{vendorId: 1027, productId: 24577}],
  });
  console.log(lightingDevice);
  await lightingDevice.open();
  await lightingDevice.claimInterface(0);

  lightingDevice.controlTransferOut({
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
    // Interface #2
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
  lightingDevice.transferOut(
    2,
    Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
  );

  return {
    ready: true,
    close: () => lightingDevice.close(),
    update: (channels: number[]) => {
      // Make sure we're sending 512 channels
      const output: number[] = [];
      for (let i = 0; i < 512; i++) {
        output[i] = channels[i] || 0;
      }
      // Send the message
      return lightingDevice.transferOut(
        2,
        Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
      );
    },
  };
}

async function noop() {}

export function useUSBDMX(): DMXDevice {
  const [lightingDevice, setLightingDevice] = React.useState<DMXDevice>({
    close: noop,
    update: noop,
    ready: false,
  });

  React.useEffect(() => {
    let internalLightingDevice: DMXDevice;
    setUpLightingDevice().then(res => {
      internalLightingDevice = res;
      setLightingDevice(res);
    });
    return () => {
      internalLightingDevice?.close();
    };
  }, []);
  return lightingDevice;
}

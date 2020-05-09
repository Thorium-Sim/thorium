import React from "react";

declare global {
  interface Navigator {
    // This USB type comes from @types/w3c-web-usb
    readonly usb: USB;
  }
}
async function noop() {}

interface DMXDevice {
  ready: boolean;
  close: () => Promise<void>;
  update: (channels: number[]) => Promise<USBOutTransferResult | void>;
  activate: () => Promise<void>;
}
async function setUpLightingDevice(): Promise<DMXDevice> {
  const lightingDevice = await navigator.usb.requestDevice({
    filters: [{vendorId: 0x403, productId: 0x6001}],
  });
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
  lightingDevice.transferOut(
    2,
    Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
  );

  return {
    ready: true,
    activate: noop,
    close: () => lightingDevice.close(),
    update: (channels: number[]) => {
      // Make sure we're sending 512 channels
      for (let i = 0; i < 512; i++) {
        universe[i] = Math.round(channels[i]) || 0;
      }
      // Send the message
      if (lightingDevice.opened) {
        return lightingDevice.transferOut(
          2,
          Uint8Array.from([...header, ...universe, ENTTEC_PRO_END_OF_MSG]),
        );
      }
      return Promise.resolve();
    },
  };
}

export function useUSBDMX(autoActivate?: boolean): DMXDevice {
  const activated = React.useRef(false);

  const activate = React.useCallback(() => {
    if (!activated.current) {
      return setUpLightingDevice().then(res => {
        activated.current = true;
        setLightingDevice(res);
      });
    }
    return Promise.resolve();
  }, []);
  const [lightingDevice, setLightingDevice] = React.useState<DMXDevice>({
    close: noop,
    update: noop,
    ready: false,
    activate,
  });

  React.useEffect(() => {
    if (autoActivate) {
      activate();
    }
    return () => {
      lightingDevice?.close();
    };
  }, [lightingDevice, autoActivate, activate]);
  return lightingDevice;
}

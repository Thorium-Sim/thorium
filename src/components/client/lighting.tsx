/** @jsx jsx */
import {jsx} from "@emotion/core";
import tw from "twin.macro";
import React from "react";
import {
  Simulator,
  useLightingControlSubscription,
  useDmxFixturesSubscription,
} from "generated/graphql";
import LightingCore from "components/views/Lighting";
import {useUSBDMX} from "helpers/hooks/useUSBDMX";
import generateDMXUniverse, {
  ConfigObj,
  AlertLevels,
} from "helpers/generateDMXUniverse";
import useInterval from "helpers/hooks/useInterval";
import {Button, Input} from "reactstrap";
import AlertConditionCore from "components/views/AlertCondition/core";
import useLocalStorage from "helpers/hooks/useLocalStorage";

interface DMXDevice {
  locationId: number;
  vendorId: number;
  productId: number;
  deviceName: string;
  manufacturer: string;
  serialNumber: string;
  deviceAddress: number;
}
const Lighting: React.FC<{
  simulator: Simulator;
}> = ({simulator}) => {
  const dmx = useUSBDMX();
  const {data} = useLightingControlSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: fixtureData} = useDmxFixturesSubscription({
    variables: {simulatorId: simulator.id},
  });

  const alertLevel = data?.simulatorsUpdate?.[0]?.alertlevel;
  const lightingData = data?.simulatorsUpdate?.[0]?.lighting;
  const lighting = lightingData && {
    ...lightingData,
    dmxConfig: lightingData?.dmxConfig?.config as ConfigObj,
  };
  const fixtures = fixtureData?.dmxFixtures.map(f => ({
    ...f,
    deviceChannels: f.DMXDevice?.channels || [],
  }));

  const actionChangeTime = React.useRef<number>(Date.now());
  const intensityHistory = React.useRef<number[]>([lighting?.intensity || 0]);
  const lightingAction = lighting?.action;
  const lightingIntensity = lighting?.intensity;
  React.useEffect(() => {
    actionChangeTime.current = Date.now();
    if (typeof lightingIntensity === "number") {
      intensityHistory.current.unshift(lightingIntensity);
      intensityHistory.current = intensityHistory.current.slice(0, 2);
    }
  }, [lightingAction, lightingIntensity]);

  const [activated, setActivated] = React.useState(false);

  useInterval(() => {
    if (alertLevel && lighting && fixtures && (dmx.ready || activated)) {
      const universe = generateDMXUniverse(
        fixtures,
        lighting,
        alertLevel as AlertLevels,
        actionChangeTime.current,
        intensityHistory.current[1] || intensityHistory.current[0],
      );
      if (activated) {
        window.thorium.sendDMXValue?.(universe);
      }
      if (dmx.ready) {
        dmx.update(universe);
      }
    }
  }, 1000 / 20);

  // DMX Controller config
  const [dmxDriver, setDMXDriver] = useLocalStorage(
    "dmx_driver",
    "enttec-usb-dmx-pro",
  );
  const [ipAddress, setIpAddress] = useLocalStorage(
    "dmx_ip_address",
    "127.0.0.1",
  );
  const [dmxDevice, setDmxDevice] = useLocalStorage("dmx_device", "");
  const [dmxUniverse, setDmxUniverse] = useLocalStorage("dmx_universe", 1);
  const [dmxDeviceList, setDMXDeviceList] = React.useState<DMXDevice[]>([]);
  React.useEffect(() => {
    window.thorium.getDMXDeviceList?.().then((res: DMXDevice[]) => {
      setDMXDeviceList(res);
      setDmxDevice((dmxDevice: string) => {
        if (!dmxDevice) return res[0].serialNumber;
        return dmxDevice;
      });
    });
  }, [setDmxDevice]);

  function activate() {
    if (!window.thorium.getDMXDeviceList) {
      return dmx.activate();
    } else {
      const device = `/dev/cu.usbserial-${dmxDevice}`;
      const config = {
        device,
        ipAddress,
        dmxDriver,
        dmxUniverse,
      };
      window.thorium.activateDMX?.(config);
      setActivated(true);
    }
  }
  return (
    <div css={tw`text-white flex justify-center items-center h-screen`}>
      <div css={tw`max-w-full w-3/5 flex flex-col justify-center`}>
        {dmx.ready ? (
          <React.Fragment>
            <LightingCore simulator={simulator} />
            <AlertConditionCore simulator={simulator} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {window.thorium.getDMXDeviceList && (
              <div css={tw`flex justify-between`}>
                <label>
                  DMX Driver
                  <Input
                    type="select"
                    value={dmxDriver}
                    onChange={e => setDMXDriver(e.target.value)}
                  >
                    <option value="enttec-usb-dmx-pro">
                      ENTTEC USB DMX Pro
                    </option>
                    <option value="dmx4all">DMX4All</option>
                    <option value="bbdmx">BeagleBone-DMX</option>
                    <option value="enttec-open-usb-dmx">
                      ENTTEC Open USB DMX
                    </option>
                    <option value="dmxking-utra-dmx-pro">
                      DMX King Ultra DMX Pro
                    </option>
                    <hr />
                    <option value="artnet">ARTNET</option>
                    <option value="sacn">sACN (e1.31)</option>
                  </Input>
                </label>
                <label>
                  Universe
                  <Input
                    type="text"
                    defaultValue={dmxUniverse}
                    onChange={e =>
                      setDmxUniverse(parseInt(e.target.value, 10) || 1)
                    }
                  ></Input>
                </label>
                {(dmxDriver === "artnet" || dmxDriver === "sacn") && (
                  <label>
                    IP Address
                    <Input
                      type="text"
                      value={ipAddress}
                      onChange={e => setIpAddress(e.target.value)}
                    ></Input>
                  </label>
                )}
                {dmxDriver === "enttec-usb-dmx-pro" && (
                  <label>
                    DMX Device
                    <Input
                      type="select"
                      value={dmxDevice}
                      onChange={e => {
                        setDmxDevice(e.target.value);
                      }}
                    >
                      {dmxDeviceList.map(d => (
                        <option key={d.serialNumber} value={d.serialNumber}>
                          {d.deviceName}
                        </option>
                      ))}
                    </Input>
                  </label>
                )}
              </div>
            )}
            <Button color="success" onClick={activate}>
              Activate Lighting
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Lighting;

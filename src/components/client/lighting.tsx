import tw from "twin.macro";
import React from "react";
import {
  Simulator,
  useDmxSetsSubscription,
  useActivateLightingMutation,
} from "generated/graphql";
import LightingCore from "components/views/Lighting";

import {Button, Input} from "reactstrap";
import AlertConditionCore from "components/views/AlertCondition/core";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import useDMXConfiguration from "./useDMXConfiguration";

export const ClientLighting: React.FC<{
  simulator: Simulator;
  clientId: string;
}> = ({simulator, clientId}) => {
  const [dmxSetId, setDmxSetId] = useLocalStorage("dmx_client_set_id", null);
  const [activate] = useActivateLightingMutation();
  const {data} = useDmxSetsSubscription();

  React.useEffect(() => {
    activate({variables: {clientId, dmxSetId}});
  }, [activate, clientId, dmxSetId]);

  if (!data?.dmxSets || data?.dmxSets.length === 0) {
    return null;
  }
  const dmxSets = data.dmxSets;
  return (
    <div>
      <label>Lighting Sets</label>
      <Input
        type="select"
        value={dmxSetId || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDmxSetId(e.target.value)
        }
      >
        <option value="" disabled>
          Choose One
        </option>
        {dmxSets.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </Input>
      {dmxSetId && (
        <Lighting simulator={simulator} clientId={clientId} outsideRendered />
      )}
    </div>
  );
};

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
  clientId: string;
  outsideRendered?: boolean;
}> = ({simulator, clientId, outsideRendered}) => {
  const {activate, activated, reset, hasFixtures} = useDMXConfiguration(
    simulator,
    clientId,
  );

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
  const [autoActivate, setAutoActivate] = useLocalStorage(
    "dmx_autoActivate",
    false,
  );
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

  React.useEffect(() => {
    if (autoActivate && !activated && hasFixtures) {
      activate({dmxDevice, ipAddress, dmxDriver, dmxUniverse});
    }
  }, [
    activate,
    autoActivate,
    activated,
    hasFixtures,
    dmxDevice,
    ipAddress,
    dmxDriver,
    dmxUniverse,
  ]);

  return (
    <div
      css={
        outsideRendered
          ? undefined
          : tw`text-white flex justify-center items-center h-screen`
      }
    >
      <div css={tw`max-w-full text-xl flex flex-col justify-center`}>
        {activated ? (
          <React.Fragment>
            <LightingCore simulator={simulator} />
            <AlertConditionCore simulator={simulator} />
            <Button
              color="danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset your lighting client? This will stop your lights from working until you activate them again.",
                  )
                ) {
                  reset();
                  setAutoActivate(false);
                }
              }}
            >
              Reset Lighting Client
            </Button>
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
            <Button
              color="success"
              onClick={() =>
                activate({dmxDevice, ipAddress, dmxDriver, dmxUniverse})
              }
            >
              Activate Lighting
            </Button>
            {window.thorium.getDMXDeviceList && (
              <label>
                <input
                  type="checkbox"
                  checked={autoActivate}
                  onChange={e => setAutoActivate(e.target.checked)}
                />{" "}
                Auto-Activate
              </label>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Lighting;

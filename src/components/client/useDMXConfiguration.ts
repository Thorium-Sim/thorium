import React from "react";
import {useUSBDMX} from "helpers/hooks/useUSBDMX";
import generateUniverse, {
  ConfigObj,
  AlertLevels,
} from "helpers/generateDMXUniverse";
import {
  useLightingControlSubscription,
  useDmxFixturesSubscription,
  Simulator,
} from "generated/graphql";

export default function useDMXConfiguration(
  simulator: Simulator,
  clientId: string,
) {
  const dmx = useUSBDMX();
  const {data} = useLightingControlSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: fixtureData} = useDmxFixturesSubscription({
    variables: {simulatorId: simulator.id, clientId},
  });

  const alertLevel = data?.simulatorsUpdate?.[0]?.alertlevel;
  const lightingData = data?.simulatorsUpdate?.[0]?.lighting;
  const lighting = React.useMemo(
    () =>
      lightingData && {
        ...lightingData,
        dmxConfig: lightingData?.dmxConfig?.config as ConfigObj,
        actionStrength: lightingData?.dmxConfig?.actionStrength
          ? lightingData.dmxConfig.actionStrength * lightingData.actionStrength
          : lightingData.actionStrength,
      },
    [lightingData],
  );

  const fixtures = React.useMemo(
    () =>
      fixtureData?.dmxFixtures.map(f => ({
        ...f,
        deviceChannels: f.DMXDevice?.channels || [],
      })),
    [fixtureData],
  );

  const [actionChangeTime, setActionChangeTime] = React.useState<number>(
    Date.now(),
  );
  const [intensityHistory, setIntensityHistory] = React.useState<number[]>([
    lighting?.intensity || 0,
  ]);
  const lightingAction = lighting?.action;
  const lightingIntensity = lighting?.intensity;
  React.useEffect(() => {
    setActionChangeTime(Date.now());
    if (typeof lightingIntensity === "number") {
      setIntensityHistory(history => {
        return [lightingIntensity, history[0]];
      });
    }
  }, [lightingAction, lightingIntensity]);

  const electronDmx = React.useRef(false);
  const worker = React.useRef<Worker>();

  const genUniverseRef = React.useRef<() => number[]>();

  React.useEffect(() => {
    if (!fixtures || !lighting || !alertLevel) return;
    genUniverseRef.current = () =>
      generateUniverse(
        fixtures,
        lighting,
        alertLevel as AlertLevels,
        actionChangeTime,
        intensityHistory[1] || intensityHistory[0],
      );
  }, [actionChangeTime, alertLevel, fixtures, intensityHistory, lighting]);

  React.useEffect(() => {
    worker.current = new Worker("/workers/updateLighting.js");
    worker.current.onmessage = () => {
      const universe = genUniverseRef.current?.();
      if (!universe) return;
      if (electronDmx.current) {
        window.thorium.sendDMXValue?.(universe);
      }
      if (dmx.ready) {
        dmx.update(universe);
      }
    };
    return () => {
      worker.current?.terminate();
      worker.current = undefined;
    };
  }, [dmx]);

  const ready = dmx.ready || electronDmx.current;
  React.useEffect(() => {
    worker.current?.postMessage({
      alertLevel,
      lighting,
      fixtures,
      ready,
      actionChangeTime,
      lastIntensity: intensityHistory[1] || intensityHistory[0],
    });
  }, [
    alertLevel,
    ready,
    fixtures,
    lighting,
    actionChangeTime,
    intensityHistory,
  ]);

  const [activated, setActivated] = React.useState(false);

  const activate = React.useCallback(
    ({dmxDevice, ipAddress, dmxDriver, dmxUniverse}) => {
      if (!window.thorium.getDMXDeviceList) {
        return dmx.activate().then(() => setActivated(true));
      } else {
        const device = `/dev/cu.usbserial-${dmxDevice}`;
        const config = {
          device,
          ipAddress,
          dmxDriver,
          dmxUniverse,
        };
        window.thorium.activateDMX?.(config);
        electronDmx.current = true;
        setActivated(true);
      }
    },
    [dmx],
  );

  const reset = React.useCallback(() => {
    dmx.close();
    setActivated(false);
  }, [dmx]);

  const hasFixtures = (fixtures?.length || 0) > 0;

  return {activate, activated, reset, hasFixtures};
}

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
import {Button} from "reactstrap";
import AlertConditionCore from "components/views/AlertCondition/core";

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

  useInterval(() => {
    if (alertLevel && lighting && fixtures && dmx.ready) {
      const universe = generateDMXUniverse(
        fixtures,
        lighting,
        alertLevel as AlertLevels,
        actionChangeTime.current,
        intensityHistory.current[1] || intensityHistory.current[0],
      );
      dmx.update(universe);
    }
  }, 1000 / 20);

  return (
    <div css={tw`text-white flex justify-center items-center h-screen`}>
      <div css={tw`max-w-full w-3/5 flex flex-col justify-center`}>
        {dmx.ready ? (
          <React.Fragment>
            <LightingCore simulator={simulator} />
            <AlertConditionCore simulator={simulator} />
          </React.Fragment>
        ) : (
          <Button color="success" onClick={dmx.activate}>
            Activate Lighting
          </Button>
        )}
      </div>
    </div>
  );
};

export default Lighting;

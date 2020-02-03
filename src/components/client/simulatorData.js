import React from "react";
import Client from "./client";
import playSound from "../generic/SoundPlayer";
import {useSimulatorUpdateSubscription} from "generated/graphql";
export const SimulatorContext = React.createContext({});

const SimulatorData = props => {
  const {
    station: {name},
    simulator,
  } = props;
  const {loading, data} = useSimulatorUpdateSubscription({
    variables: {simulatorId: simulator.id},
  });
  if (loading || !data) return null;
  const {simulators} = data;
  if (!simulators[0]) return <div>No Simulator</div>;
  const station = simulators[0].stations.find(s => s.name === name);
  return (
    <SimulatorContext.Provider value={simulators[0]}>
      <Client
        {...props}
        simulator={simulators[0]}
        station={station || props.station}
      />
    </SimulatorContext.Provider>
  );
};
export default playSound(SimulatorData);

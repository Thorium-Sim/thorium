import React from "react";
import Client from "./client";
import {
  useSimulatorUpdateSubscription,
  Station,
  Simulator,
  Flight,
  Client as ClientInterface,
} from "generated/graphql";
export const SimulatorContext = React.createContext({});

interface SimulatorDataProps {
  station: Pick<Station, "name">;
  simulator: Pick<Simulator, "id" | "name">;
  client: ClientInterface;
  flight: Flight;
}
const SimulatorData = (props: SimulatorDataProps) => {
  const {station: stationObj, simulator} = props;
  const {loading, data} = useSimulatorUpdateSubscription({
    variables: {simulatorId: simulator?.id},
  });
  if (loading || !data) return null;
  const {simulatorsUpdate: simulators} = data;
  if (!simulators?.[0]) return <div>No Simulator</div>;
  const station = simulators?.[0]?.stations?.find(
    s => s?.name === stationObj?.name,
  );
  const defaultStation = {name: props.station.name, cards: []};
  return (
    <SimulatorContext.Provider value={simulators[0]}>
      <Client
        simulator={simulators[0]}
        station={station || defaultStation}
        client={props.client}
        flight={props.flight}
      />
    </SimulatorContext.Provider>
  );
};
export default SimulatorData;

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
  const defaultStation = React.useMemo(
    () => ({name: props.station.name, cards: []}),
    [props.station.name],
  );
  const {station: stationObj, simulator} = props;
  const {data} = useSimulatorUpdateSubscription({
    variables: {simulatorId: simulator?.id},
  });
  const simulators = data?.simulatorsUpdate;

  const station = React.useMemo(
    () => simulators?.[0]?.stations?.find(s => s?.name === stationObj?.name),
    [simulators, stationObj],
  );

  if (!simulators?.[0]) return <div>No Simulator</div>;
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

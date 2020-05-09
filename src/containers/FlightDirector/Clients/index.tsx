import React, {Fragment} from "react";
import {Col, Row, Container} from "helpers/reactstrap";
import {DateTime} from "luxon";
import {capitalCase} from "change-case";
import {FaBan} from "react-icons/fa";
import {
  Flight,
  Client,
  Keyboard,
  useDisconnectClientMutation,
  useSetClientSimulatorMutation,
  useSetClientFlightMutation,
  useSetClientStationMutation,
  useClientChangedSubscription,
  useFlightsSubSubscription,
  useClientsInterfacesAndKeyboardsQuery,
  ClientsInterfacesAndKeyboardsQueryHookResult,
  Interface,
  useSetSoundPlayerMutation,
  DmxSet,
} from "generated/graphql";
import {useNavigate, useParams} from "react-router-dom";

const Keyboards = ({keyboards = []}: {keyboards: Keyboard[]}) => {
  if (keyboards.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <hr />
      <optgroup label="Keyboards">
        {keyboards.map(k => (
          <option key={k?.id || "keyboard"} value={`keyboard:${k.id}`}>
            {k.name}
          </option>
        ))}
      </optgroup>
    </Fragment>
  );
};
const DMXSets = ({dmxSets = []}: {dmxSets: Pick<DmxSet, "id" | "name">[]}) => {
  if (dmxSets.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <hr />
      <optgroup label="Lighting">
        {dmxSets.map(k => (
          <option key={k?.id || "dmxSet"} value={`dmxSet:${k.id}`}>
            {k.name}
          </option>
        ))}
      </optgroup>
    </Fragment>
  );
};
const Interfaces = ({
  client,
  interfaces = [],
}: {
  client: Client;
  interfaces: Interface[];
}) => {
  if (!client.simulator) return null;
  const simInterfaces = client?.simulator?.interfaces
    ?.map(i => interfaces.find(ii => ii.id === i))
    .filter(Boolean);
  if (simInterfaces?.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <hr />
      <optgroup label="Interfaces">
        {simInterfaces?.map(i => (
          <option key={i?.id || "interface"} value={`interface-id:${i?.id}`}>
            {i?.name}
          </option>
        ))}
      </optgroup>
    </Fragment>
  );
};

interface ClientRowProps {
  client: Client;
  index: number;
  flights: Flight[];
  flightId: string;
  interfaces: Interface[];
  keyboards: Keyboard[];
  dmxSets: Pick<DmxSet, "id" | "name">[];
}
const ClientRow = ({
  client,
  index,
  flights,
  flightId,
  interfaces,
  keyboards,
  dmxSets,
}: ClientRowProps) => {
  const [setClientFlight] = useSetClientFlightMutation();
  const [setClientSimulator] = useSetClientSimulatorMutation();
  const [setClientStation] = useSetClientStationMutation();
  const [setSoundPlayer] = useSetSoundPlayerMutation();
  const select = (
    client: string,
    type: "flight" | "simulator" | "station",
    id: string,
  ) => {
    const obj = {
      client,
      id,
    };
    if (type === "flight") {
      setClientFlight({variables: obj});
    }
    if (type === "simulator") {
      setClientSimulator({variables: obj});
    }
    if (type === "station") {
      setClientStation({variables: obj});
    }
  };
  const [disconnectClient] = useDisconnectClientMutation();
  const removeClient = (client: string) => {
    disconnectClient({
      variables: {
        client,
      },
    });
  };

  const thisFlight = flights.find(f => f.id === flightId);
  return (
    <tr key={`flight-${client.id}-${index}`}>
      <td>
        <FaBan
          className="text-danger remove-client"
          onClick={() => removeClient(client.id)}
        />{" "}
        {client.label}
      </td>
      <td data-testid="flight-picker-cell">
        <select
          value={(client.flight && client.flight.id) || ""}
          onChange={e => select(client.id, "flight", e.target.value)}
          className="form-control-sm c-select flight-picker"
        >
          <option value="">Select a flight</option>
          {flights && (
            <optgroup label="This Flight">
              <option value={flightId}>{thisFlight?.name}</option>
            </optgroup>
          )}
          <optgroup label="Other Flights">
            {flights ? (
              flights
                .filter(f => f.id !== flightId)
                .map(f => {
                  return (
                    <option key={`flight-${client.id}-${f.id}`} value={f.id}>
                      {`${f.name}: ${DateTime.fromJSDate(
                        new Date(f?.date || Date.now()),
                      ).toFormat("M/d/y hh:mma")}`}
                    </option>
                  );
                })
            ) : (
              <option disabled>No Flights</option>
            )}
          </optgroup>
        </select>
      </td>
      <td data-testid="simulator-picker-cell">
        <select
          value={(client.simulator && client.simulator.id) || ""}
          onChange={e => select(client.id, "simulator", e.target.value)}
          className="form-control-sm c-select sim-picker"
        >
          <option value="">Select a simulator</option>
          {client.flight ? (
            client?.flight?.simulators?.map(s => (
              <option key={`${client.id}-simulator-${s?.id}`} value={s?.id}>
                {s?.name}
              </option>
            ))
          ) : (
            <option disabled>No Simulators</option>
          )}
        </select>
      </td>
      <td data-testid="station-picker-cell">
        {client.mobile ? (
          <select
            value={client?.station?.name || ""}
            onChange={e => select(client.id, "station", e.target.value)}
            className="form-control-sm c-select station-picker"
          >
            <option value="">Select a screen</option>
            {client?.cards
              ?.filter(c => c !== "Interfaces")
              .map(
                c =>
                  c && (
                    <option key={`${client.id}-station-${c}`} value={c}>
                      {capitalCase(c)}
                    </option>
                  ),
              )}
            {client?.cards?.includes("Interfaces") && (
              <Interfaces client={client} interfaces={interfaces} />
            )}
          </select>
        ) : (
          <select
            value={(client.station && client.station.name) || ""}
            onChange={e => select(client.id, "station", e.target.value)}
            className="form-control-sm c-select station-picker"
          >
            <option value="">Select a station</option>
            {client.simulator ? (
              client?.simulator?.stations?.map(s => (
                <option
                  key={`${client.id}-station-${s?.name}`}
                  value={s?.name || ""}
                >
                  {s?.name}
                </option>
              ))
            ) : (
              <option disabled>No Stations</option>
            )}
            {client.simulator && (
              <Fragment>
                <hr />
                <option value={"Viewscreen"}>Viewscreen</option>
                <option value={"Sound"}>Sound</option>
                <option value={"Blackout"}>Blackout</option>
                <Keyboards keyboards={keyboards} />
                <Interfaces client={client} interfaces={interfaces} />
                <DMXSets dmxSets={dmxSets} />
              </Fragment>
            )}
          </select>
        )}
      </td>
      <td>
        {client.station &&
          ((client?.station?.name?.indexOf("keyboard") || 0) > -1 ||
            client.station.name === "Viewscreen") && (
            <input
              type="checkbox"
              checked={Boolean(client.soundPlayer)}
              onChange={e =>
                setSoundPlayer({
                  variables: {id: client.id, soundPlayer: e.target.checked},
                })
              }
            />
          )}
      </td>
    </tr>
  );
};

export const trainingSteps = [
  {
    selector: ".client-table",
    content: (
      <span>
        This is the client table. All currently connected clients appear here.
        Clients that are either unassigned or assigned to this flight appear at
        the top. Clients assigned to another flight appear at the bottom. Be
        careful not to change clients assigned to other flights. That might
        cause problems for whoever is using that client.
      </span>
    ),
  },
  {
    selector: ".remove-client",
    content: (
      <span>
        Click this button to remove a client. The client will always come back
        if it reconnects. To reconnect a client, just reopen the client or
        navigate the web browser to the client page.
      </span>
    ),
  },
  {
    selector: ".flight-picker",
    content: (
      <span>
        Choose the flight you want to assign this client to with this dropdown.
        If the flight only has one simulator, the simulator dropdown will
        automatically be filled.
      </span>
    ),
  },
  {
    selector: ".sim-picker",
    content: (
      <span>
        Choose the simulator you want to assign this client to with this
        dropdown.
      </span>
    ),
  },
  {
    selector: ".station-picker",
    content: (
      <span>
        Choose the station you want to assign this client to with this dropdown.
        It is populated with the stations in the current station set of the
        selected simulator. It also has some special stations:{" "}
        <ul>
          <li>
            <strong>Viewscreen</strong> creates a viewscreen for this simulator.
          </li>
          <li>
            <strong>Sound</strong> turns the station into a dedicated sound
            player.
          </li>
          <li>
            <strong>Blackout</strong> blacks out the station - useful for when
            you don't want a client to be used during a flight.
          </li>
          <li>
            <strong>Keyboards</strong> make the station's keyboard activate
            keyboard macros.
          </li>
        </ul>
      </span>
    ),
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const {flightId} = useParams();
  const {data, loading} = useClientChangedSubscription();
  const {
    data: flightsData,
    loading: flightsLoading,
  } = useFlightsSubSubscription();
  const {
    data: keyboardInterfaceData = {keyboard: [], interfaces: [], dmxSets: []},
    loading: keyboardLoading,
  }: ClientsInterfacesAndKeyboardsQueryHookResult = useClientsInterfacesAndKeyboardsQuery();

  const clients = (data?.clientChanged || []) as Client[];
  const flights = (flightsData?.flightsUpdate || []) as Flight[];
  const {keyboard, interfaces, dmxSets} = keyboardInterfaceData as {
    keyboard: Keyboard[];
    interfaces: Interface[];
    dmxSets: DmxSet[];
  };
  if (
    !flightId ||
    loading ||
    flightsLoading ||
    !data ||
    !flightsData ||
    keyboardLoading
  )
    return null;
  if (flights.map(f => f?.id).indexOf(flightId) === -1) {
    navigate("/");
    return null;
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          xs="12"
          style={{
            height: "60vh",
            overflowY: "scroll",
          }}
        >
          <h4>Clients</h4>
          <table className="table table-striped table-sm client-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Flight</th>
                <th>Simulator</th>
                <th>Station</th>
                <th>Sound Player</th>
              </tr>
            </thead>
            <tbody>
              <Fragment>
                {clients
                  ?.filter(client => {
                    return !client?.flight || client?.flight.id === flightId;
                  })
                  .map(
                    (client, index) =>
                      client && (
                        <ClientRow
                          client={client}
                          key={client.id || "client"}
                          flightId={flightId}
                          index={index}
                          flights={flights}
                          interfaces={interfaces}
                          keyboards={keyboard}
                          dmxSets={dmxSets}
                        />
                      ),
                  )}
                <tr>
                  <td colSpan={5}>
                    <strong>Clients Assigned to Other Flights</strong>
                  </td>
                </tr>
                {clients
                  ?.filter(client => {
                    return (
                      client?.flight?.id && client?.flight?.id !== flightId
                    );
                  })
                  .map(
                    (client, index) =>
                      client && (
                        <ClientRow
                          client={client}
                          key={client.id || "other-flight-client"}
                          index={index}
                          flightId={flightId}
                          flights={flights}
                          interfaces={interfaces}
                          keyboards={keyboard}
                          dmxSets={dmxSets}
                        />
                      ),
                  )}
              </Fragment>
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Clients;

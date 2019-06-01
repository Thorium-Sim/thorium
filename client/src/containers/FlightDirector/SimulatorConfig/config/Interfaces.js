import React from "react";
import gql from "graphql-tag.macro";
import { graphql, Query, Mutation } from "react-apollo";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";
import FontAwesome from "react-fontawesome";

function reducer(state, action) {
  if (action.type === "setInterface") {
    return { selectedInterface: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

function parseInterface({ components, values }) {
  return components
    .filter(c => c.component.name.indexOf("macro-") > -1)
    .map(c => ({
      id: c.id,
      event: c.component.name.replace("macro-", ""),
      args: values[c.id]
    }));
}

const App = ({
  data: { loading, interfaces },
  selectedSimulator: simulator,
  client
}) => {
  const updateInterfaces = (e, action) => {
    const variables = {
      simulatorId: simulator.id,
      interfaces: simulator.interfaces.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeInterfaces = (id, action) => {
    const variables = {
      simulatorId: simulator.id,
      interfaces: (simulator.interfaces || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };

  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedInterface, selectedStationSet, selectedAction } = state;

  if (loading || !interfaces) return null;

  const iFace = interfaces.find(s => s.id === selectedInterface) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = iFace.id ? parseInterface(iFace) : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedInterface] &&
      missionConfigs[selectedInterface][selectedStationSet] &&
      missionConfigs[selectedInterface][selectedStationSet][selectedAction]) ||
    {};

  return (
    <Container fluid>
      <Row>
        <Mutation
          mutation={gql`
            mutation UpdateSimulatorInterfaces(
              $simulatorId: ID!
              $interfaces: [ID]!
            ) {
              updateSimulatorInterfaces(
                simulatorId: $simulatorId
                interfaces: $interfaces
              )
            }
          `}
        >
          {action => (
            <Col sm={2}>
              Interfaces
              <ListGroup>
                {(simulator.interfaces || []).map(s => {
                  const interfaceObj = interfaces.find(c => c.id === s);
                  if (!interfaceObj) return null;
                  return (
                    <ListGroupItem
                      key={s}
                      active={iFace.id === s}
                      onClick={() => dispatch({ type: "setInterface", id: s })}
                    >
                      {" "}
                      <FontAwesome
                        className="text-danger"
                        name="ban"
                        onClick={() => removeInterfaces(s, action)}
                      />{" "}
                      {interfaceObj.name}{" "}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
              <select
                className="btn btn-primary btn-block"
                value={"nothing"}
                onChange={e => updateInterfaces(e, action)}
              >
                <option value="nothing">
                  Add an interface to the simulator
                </option>
                {interfaces
                  .filter(
                    s => !(simulator.interfaces || []).find(c => c === s.id)
                  )
                  .map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </Col>
          )}
        </Mutation>
        {iFace.id && (
          <Col sm={2}>
            Station Sets
            <ListGroup>
              {simulator.stationSets.map(m => (
                <ListGroupItem
                  key={m.id}
                  active={stationSet.id === m.id}
                  onClick={() => dispatch({ type: "setStationSet", id: m.id })}
                >
                  {m.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        )}
        {stationSet.id && (
          <Col sm={3}>
            Actions
            <ListGroup>
              {actions.map(m => (
                <ListGroupItem
                  key={`${m.id}-${m.stepId}`}
                  active={action.id === m.id}
                  onClick={() => dispatch({ type: "setAction", id: m.id })}
                >
                  <EventName id={m.event} label={m.event} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        )}
        {action.id && (
          <Col sm={5}>
            Action
            <Query
              query={gql`
                query Clients {
                  clients {
                    id
                    label
                  }
                }
              `}
            >
              {({ data, client }) => {
                const EventMacro =
                  Macros[action.event] ||
                  (() => {
                    return null;
                  });
                const args = action.args || {};
                return (
                  EventMacro && (
                    <Mutation
                      mutation={gql`
                        mutation setSimulatorConfig(
                          $simulatorId: ID!
                          $missionId: ID!
                          $stationSetId: ID!
                          $actionId: ID!
                          $args: JSON!
                        ) {
                          setSimulatorMissionConfig(
                            simulatorId: $simulatorId
                            missionId: $missionId
                            stationSetId: $stationSetId
                            actionId: $actionId
                            args: $args
                          )
                        }
                      `}
                      refetchQueries={["Simulators"]}
                    >
                      {action => (
                        <EventMacro
                          stations={stationSet.stations}
                          clients={data && data.clients}
                          updateArgs={(key, value) => {
                            action({
                              variables: {
                                simulatorId: simulator.id,
                                missionId: iFace.id,
                                stationSetId: stationSet.id,
                                actionId: selectedAction,
                                args: { ...config, [key]: value }
                              }
                            });
                          }}
                          args={{ ...args, ...config }}
                          client={client}
                        />
                      )}
                    </Mutation>
                  )
                );
              }}
            </Query>
          </Col>
        )}
      </Row>
    </Container>
  );
};

const QUERY = gql`
  query Interfaces {
    interfaces {
      id
      name
      components
      values
    }
  }
`;

export default graphql(QUERY)(App);

import React from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { graphql, Query, Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";
import FontAwesome from "react-fontawesome";

function reducer(state, action) {
  if (action.type === "setCommandLine") {
    return { selectedCommandLine: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

function parseCommandLine({ components, values }) {
  return components
    .filter(c => c.component.name.indexOf("macro-") > -1)
    .map(c => ({
      id: c.id,
      event: c.component.name.replace("macro-", ""),
      args: values[c.id]
    }));
}

const App = ({
  data: { loading, commandLine },
  selectedSimulator: simulator,
  client
}) => {
  const updateCommandLines = (e, action) => {
    const variables = {
      simulatorId: simulator.id,
      commandLines: simulator.commandLines.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeCommandLine = (id, action) => {
    const variables = {
      simulatorId: simulator.id,
      commandLines: (simulator.commandLines || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };

  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedCommandLine, selectedStationSet, selectedAction } = state;

  if (loading || !commandLine) return null;

  const commandLineObj =
    commandLine.find(s => s.id === selectedCommandLine) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = commandLineObj.id ? parseCommandLine(commandLineObj) : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedCommandLine] &&
      missionConfigs[selectedCommandLine][selectedStationSet] &&
      missionConfigs[selectedCommandLine][selectedStationSet][
        selectedAction
      ]) ||
    {};

  return (
    <Container fluid>
      <Row>
        <Mutation
          mutation={gql`
            mutation UpdateSimulatorCommandLines(
              $simulatorId: ID!
              $commandLines: [ID]!
            ) {
              updateSimulatorCommandLines(
                simulatorId: $simulatorId
                commandLines: $commandLines
              )
            }
          `}
        >
          {action => (
            <Col sm={2}>
              <ListGroup>
                {(simulator.commandLines || []).map(s => {
                  const command = commandLine.find(c => c.id === s);
                  if (!command) return null;
                  return (
                    <ListGroupItem
                      key={s}
                      active={commandLineObj.id === s}
                      onClick={() =>
                        dispatch({ type: "setCommandLine", id: s })
                      }
                    >
                      {" "}
                      <FontAwesome
                        className="text-danger"
                        name="ban"
                        onClick={() => removeCommandLine(s, action)}
                      />{" "}
                      {command.name}{" "}
                      <div>
                        <small>
                          {command.commands.map(c => c.name).join(", ")}
                        </small>
                      </div>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
              <select
                className="btn btn-primary btn-block"
                value={"nothing"}
                onChange={e => updateCommandLines(e, action)}
              >
                <option value="nothing">
                  Add a command line to the simulator
                </option>
                {commandLine
                  .filter(
                    s => !(simulator.commandLines || []).find(c => c === s.id)
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
        {commandLineObj.id && (
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
                                missionId: commandLineObj.id,
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
  query CommandLines {
    commandLine {
      id
      name
      commands {
        name
      }
      components
      values
    }
  }
`;

export default graphql(QUERY)(App);

import React from "react";
import gql from "graphql-tag.macro";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "helpers/reactstrap";
import { Query, Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";
import FontAwesome from "react-fontawesome";
import { useQuery } from "@apollo/react-hooks";

function reducer(state, action) {
  if (action.type === "setTrigger") {
    return { selectedTrigger: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

function parseTrigger({ components, values }) {
  return components
    .filter(c => c.component.name.indexOf("macro-") > -1)
    .map(c => ({
      id: c.id,
      event: c.component.name.replace("macro-", ""),
      args: values[c.id]
    }));
}

const QUERY = gql`
  query Triggers {
    triggers {
      id
      name
      components
      values
    }
  }
`;

const App = ({ selectedSimulator: simulator }) => {
  const updateTriggers = (e, action) => {
    const variables = {
      simulatorId: simulator.id,
      triggers: simulator.triggers.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeTriggers = (id, action) => {
    const variables = {
      simulatorId: simulator.id,
      triggers: (simulator.triggers || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };
  const { loading, data } = useQuery(QUERY);

  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedTrigger, selectedStationSet, selectedAction } = state;
  if (loading || !data) return null;
  const { triggers } = data;

  const trigger = triggers.find(s => s.id === selectedTrigger) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = trigger.id ? parseTrigger(trigger) : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedTrigger] &&
      missionConfigs[selectedTrigger][selectedStationSet] &&
      missionConfigs[selectedTrigger][selectedStationSet][selectedAction]) ||
    {};

  return (
    <Container fluid>
      <Row>
        <Mutation
          mutation={gql`
            mutation UpdateSimulatorTriggers(
              $simulatorId: ID!
              $triggers: [ID]!
            ) {
              updateSimulatorTriggers(
                simulatorId: $simulatorId
                triggers: $triggers
              )
            }
          `}
        >
          {action => (
            <Col sm={2}>
              Triggers
              <ListGroup>
                {(simulator.triggers || []).map(s => {
                  const triggerObj = triggers.find(c => c.id === s);
                  if (!triggerObj) return null;
                  return (
                    <ListGroupItem
                      key={s}
                      active={trigger.id === s}
                      onClick={() => dispatch({ type: "setTrigger", id: s })}
                    >
                      {" "}
                      <FontAwesome
                        className="text-danger"
                        name="ban"
                        onClick={() => removeTriggers(s, action)}
                      />{" "}
                      {triggerObj.name}{" "}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
              <select
                className="btn btn-primary btn-block"
                value={"nothing"}
                onChange={e => updateTriggers(e, action)}
              >
                <option value="nothing">Add a trigger to the simulator</option>
                {triggers
                  .filter(
                    s => !(simulator.triggers || []).find(c => c === s.id)
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
        {trigger.id && (
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
                                missionId: trigger.id,
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

export default App;

import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";

const MacrosConfigQuery = gql`
  query Macros {
    macros {
      id
      name
      actions {
        id
        args
        event
        needsConfig
      }
    }
  }
`;

function reducer(state, action) {
  if (action.type === "setMacro") {
    return { selectedMacro: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

const MacrosConfig = ({ macros, simulator }) => {
  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedMacro, selectedStationSet, selectedAction } = state;
  const macro = macros.find(s => s.id === selectedMacro) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = macro.id ? macro.actions.filter(t => t.needsConfig) : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedMacro] &&
      missionConfigs[selectedMacro][selectedStationSet] &&
      missionConfigs[selectedMacro][selectedStationSet][selectedAction]) ||
    {};
  console.log(macro);
  return (
    <Container fluid className="sim-missions-config">
      <Row>
        <Col sm={2}>
          Macros
          <ListGroup>
            {macros.map(m => (
              <ListGroupItem
                key={m.id}
                active={macro.id === m.id}
                onClick={() => dispatch({ type: "setMacro", id: m.id })}
              >
                {m.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {macro.id && (
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
                const args = JSON.parse(action.args) || {};
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
                                missionId: macro.id,
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
const MacrosData = ({ selectedSimulator }) => {
  return (
    <Query query={MacrosConfigQuery}>
      {({ loading, data }) =>
        loading ? null : (
          <MacrosConfig macros={data.macros} simulator={selectedSimulator} />
        )
      }
    </Query>
  );
};
export default MacrosData;

import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";

const KeyboardConfigQuery = gql`
  query Keyboards {
    keyboard {
      id
      name
      keys {
        id
        key
        meta
        actions {
          id
          args
          event
        }
      }
    }
  }
`;

function reducer(state, action) {
  if (action.type === "setKeyboard") {
    return { selectedKeyboard: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

const KeyboardConfig = ({ keyboards, simulator }) => {
  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedKeyboard, selectedStationSet, selectedAction } = state;
  const keyboard = keyboards.find(s => s.id === selectedKeyboard) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = keyboard.id
    ? keyboard.keys
        .reduce(
          (acc, t, i) =>
            acc.concat(
              t.actions.map(item => ({
                ...item,
                order: i,
                stepName: `${t.meta.join("+")}${t.meta.length > 0 ? " " : ""}${
                  t.key
                }`,
                stepId: t.id
              }))
            ),
          []
        )
        .sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          return 0;
        })
    : [];
  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedKeyboard] &&
      missionConfigs[selectedKeyboard][selectedStationSet] &&
      missionConfigs[selectedKeyboard][selectedStationSet][selectedAction]) ||
    {};
  return (
    <Container fluid className="sim-missions-config">
      <Row>
        <Col sm={2}>
          Keyboards
          <ListGroup>
            {keyboards.map(m => (
              <ListGroupItem
                key={m.id}
                active={keyboard.id === m.id}
                onClick={() => dispatch({ type: "setKeyboard", id: m.id })}
              >
                {m.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {keyboard.id && (
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
                  <div>{m.stepName}</div>
                  <small>
                    {" "}
                    <EventName id={m.event} label={m.event} />
                  </small>
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
                                missionId: keyboard.id,
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
const KeyboardData = ({ selectedSimulator }) => {
  return (
    <Query query={KeyboardConfigQuery}>
      {({ loading, data }) =>
        loading ? null : (
          <KeyboardConfig
            keyboards={data.keyboard}
            simulator={selectedSimulator}
          />
        )
      }
    </Query>
  );
};
export default KeyboardData;

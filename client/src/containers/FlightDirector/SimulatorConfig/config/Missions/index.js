import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";

import "./style.scss";

const MissionsConfigQuery = gql`
  query MissionsQuery {
    missions {
      id
      name
      timeline {
        id
        name
        timelineItems {
          id
          args
          delay
          event
          needsConfig
        }
      }
    }
  }
`;

function reducer(state, action) {
  if (action.type === "setMission") {
    return { selectedMission: action.id };
  }
  if (action.type === "setStationSet") {
    return { ...state, selectedStationSet: action.id, selectedAction: null };
  }
  if (action.type === "setAction") {
    return { ...state, selectedAction: action.id };
  }
  return state;
}

const MissionConfig = ({ missions, simulator }) => {
  const { missionConfigs } = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const { selectedMission, selectedStationSet, selectedAction } = state;
  const mission = missions.find(s => s.id === selectedMission) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = mission.id
    ? mission.timeline
        .reduce(
          (acc, t, i) =>
            acc.concat(
              t.timelineItems.map(item => ({
                ...item,
                order: i,
                stepName: t.name,
                stepId: t.id
              }))
            ),
          []
        )
        .filter(t => t.needsConfig)
        .sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          return 0;
        })
    : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedMission] &&
      missionConfigs[selectedMission][selectedStationSet] &&
      missionConfigs[selectedMission][selectedStationSet][selectedAction]) ||
    {};
  return (
    <Container fluid className="sim-missions-config">
      <Row>
        <Col sm={2}>
          Missions
          <ListGroup>
            {missions.map(m => (
              <ListGroupItem
                key={m.id}
                active={mission.id === m.id}
                onClick={() => dispatch({ type: "setMission", id: m.id })}
              >
                {m.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {mission.id && (
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
                  <div>
                    ({m.order + 1}) {m.stepName}
                  </div>
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
                                missionId: mission.id,
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
const MissionData = ({ selectedSimulator }) => {
  return (
    <Query query={MissionsConfigQuery}>
      {({ loading, data }) =>
        loading ? null : (
          <MissionConfig
            missions={data.missions}
            simulator={selectedSimulator}
          />
        )
      }
    </Query>
  );
};
export default MissionData;

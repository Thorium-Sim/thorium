import React from "react";
import gql from "graphql-tag.macro";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "helpers/reactstrap";
import {Query, Mutation} from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import * as Macros from "components/macros";
import {useQuery, useMutation} from "@apollo/client";
import {FaBan} from "react-icons/fa";

function reducer(state, action) {
  if (action.type === "setMidiSet") {
    return {selectedMidiSet: action.id};
  }
  if (action.type === "setStationSet") {
    return {...state, selectedStationSet: action.id, selectedAction: null};
  }
  if (action.type === "setAction") {
    return {...state, selectedAction: action.id};
  }
  return state;
}

function parseMidiSet({controls}) {
  return controls.reduce((acc, {config}) => {
    const {macros = [], upMacros = []} = config;
    return acc.concat(macros).concat(upMacros);
  }, []);
}

const QUERY = gql`
  query MidiSets {
    midiSets {
      id
      name
      deviceName
      controls {
        id
        channel
        messageType
        key
        controllerNumber
        channelModeMessage
        actionMode
        config
      }
    }
  }
`;

const ADD_MIDI_SET = gql`
  mutation AddMidiSet($simulatorId: ID!, $midiSet: ID!) {
    simulatorAddMidiSet(simulatorId: $simulatorId, midiSet: $midiSet) {
      id
    }
  }
`;
const REMOVE_MIDI_SET = gql`
  mutation RemoveMidiSet($simulatorId: ID!, $midiSet: ID!) {
    simulatorRemoveMidiSet(simulatorId: $simulatorId, midiSet: $midiSet) {
      id
    }
  }
`;

const App = ({selectedSimulator: simulator}) => {
  const [addMidiSet] = useMutation(ADD_MIDI_SET);
  const [removeMidiSet] = useMutation(REMOVE_MIDI_SET);

  const {loading, data} = useQuery(QUERY);

  const {missionConfigs} = simulator;
  const [state, dispatch] = React.useReducer(reducer, {});
  const {selectedMidiSet, selectedStationSet, selectedAction} = state;
  if (loading || !data) return null;
  const {midiSets} = data;

  const midiSet = midiSets.find(s => s.id === selectedMidiSet) || {};
  const stationSet =
    simulator.stationSets.find(s => s.id === selectedStationSet) || {};
  const actions = midiSet.id ? parseMidiSet(midiSet) : [];

  const action = actions.find(a => a.id === selectedAction) || {};

  const config =
    (missionConfigs[selectedMidiSet] &&
      missionConfigs[selectedMidiSet][selectedStationSet] &&
      missionConfigs[selectedMidiSet][selectedStationSet][selectedAction]) ||
    {};

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          Midi Sets
          <ListGroup>
            {(simulator.midiSets || []).map(s => {
              const midiSetObj = midiSets.find(c => c.id === s);
              if (!midiSetObj) return null;
              return (
                <ListGroupItem
                  key={s}
                  active={midiSet.id === s}
                  onClick={() => dispatch({type: "setMidiSet", id: s})}
                >
                  {" "}
                  <FaBan
                    className="text-danger"
                    onClick={() =>
                      removeMidiSet({
                        variables: {simulatorId: simulator.id, midiSet: s},
                      })
                    }
                  />{" "}
                  {midiSetObj.name}{" "}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <select
            className="btn btn-primary btn-block"
            value={"nothing"}
            onChange={e =>
              addMidiSet({
                variables: {simulatorId: simulator.id, midiSet: e.target.value},
              })
            }
          >
            <option value="nothing">Add a Midi Set to the simulator</option>
            {midiSets
              .filter(s => !(simulator.midiSets || []).find(c => c === s.id))
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </Col>
        {midiSet.id && (
          <Col sm={2}>
            Station Sets
            <ListGroup>
              {simulator.stationSets.map(m => (
                <ListGroupItem
                  key={m.id}
                  active={stationSet.id === m.id}
                  onClick={() => dispatch({type: "setStationSet", id: m.id})}
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
                  onClick={() => dispatch({type: "setAction", id: m.id})}
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
              {({data, client}) => {
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
                          key={selectedAction}
                          simulatorId={simulator.id}
                          stations={stationSet.stations}
                          clients={data && data.clients}
                          updateArgs={(key, value) => {
                            action({
                              variables: {
                                simulatorId: simulator.id,
                                missionId: midiSet.id,
                                stationSetId: stationSet.id,
                                actionId: selectedAction,
                                args: {...config, [key]: value},
                              },
                            });
                          }}
                          args={{...args, ...config}}
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

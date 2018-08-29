import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  Input
} from "reactstrap";
import FontAwesome from "react-fontawesome";
import Views, { Widgets } from "../../../views/index";
import { titleCase } from "change-case";
import ExtraMessageGroups from "./messageGroups";

const viewList = Object.keys(Views)
  .filter(v => {
    return v !== "Offline" && v !== "Login" && v !== "Viewscreen";
  })
  .sort();
export const STATION_QUERY = gql`
  query Station($simulatorId: ID!, $simId: String!, $station: String!) {
    station(simulatorId: $simulatorId, station: $station) {
      name
      login
      cards {
        name
        component
      }
      widgets
      executive
      messageGroups
    }
    simulators(id: $simId) {
      id
      panels
    }
    softwarePanels {
      id
      name
    }
  }
`;

const Station = ({ stations, simulatorId, station: stationName }) => {
  const inSim = comp => {
    const cards = stations.reduce(
      (prev, next) => prev.concat(next.cards.map(c => c.component)),
      []
    );
    return cards.indexOf(comp) > -1;
  };
  const addCard = action => e => {
    let name = prompt("What is the card name?", titleCase(e.target.value));
    if (name) {
      const variables = {
        simulatorId,
        station: stationName,
        cardName: name,
        cardComponent: e.target.value
      };
      action({ variables });
    }
  };
  return (
    <Query
      query={STATION_QUERY}
      variables={{ simulatorId, simId: simulatorId, station: stationName }}
    >
      {({ loading, data }) => {
        if (loading || !data) return null;
        const { station, simulators, softwarePanels } = data;
        return (
          <div>
            <table className="table table-sm table-striped table-hover">
              <thead className="thead-default">
                <tr>
                  <th colSpan="3">
                    <span>
                      {station.name} |{" "}
                      <label style={{ display: "inline" }}>
                        <Mutation
                          refetchQueries={[
                            {
                              query: STATION_QUERY,
                              variables: {
                                simulatorId,
                                simId: simulatorId,
                                station: stationName
                              }
                            }
                          ]}
                          mutation={gql`
                            mutation Login(
                              $simulatorId: ID!
                              $station: String!
                              $login: Boolean!
                            ) {
                              setSimulatorStationLogin(
                                simulatorId: $simulatorId
                                station: $station
                                login: $login
                              )
                            }
                          `}
                        >
                          {action => (
                            <input
                              checked={station.login}
                              onChange={e =>
                                action({
                                  variables: {
                                    simulatorId,
                                    station: stationName,
                                    login: e.target.checked
                                  }
                                })
                              }
                              type="checkbox"
                            />
                          )}
                        </Mutation>{" "}
                        Auto-Login
                      </label>{" "}
                      |{" "}
                      <label style={{ display: "inline" }}>
                        <Mutation
                          refetchQueries={[
                            {
                              query: STATION_QUERY,
                              variables: {
                                simulatorId,
                                simId: simulatorId,
                                station: stationName
                              }
                            }
                          ]}
                          mutation={gql`
                            mutation Exec(
                              $simulatorId: ID!
                              $station: String!
                              $exec: Boolean!
                            ) {
                              setSimulatorStationExecutive(
                                simulatorId: $simulatorId
                                station: $station
                                exec: $exec
                              )
                            }
                          `}
                        >
                          {action => (
                            <input
                              checked={station.executive}
                              onChange={e =>
                                action({
                                  variables: {
                                    simulatorId,
                                    station: stationName,
                                    exec: e.target.checked
                                  }
                                })
                              }
                              type="checkbox"
                            />
                          )}
                        </Mutation>{" "}
                        Executive
                      </label>
                    </span>
                  </th>
                  <th />
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Component</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {station.cards.map((card, index) => {
                  return (
                    <tr key={`${station.name}-${index}`}>
                      <td>
                        <Mutation
                          refetchQueries={[
                            {
                              query: STATION_QUERY,
                              variables: {
                                simulatorId,
                                simId: simulatorId,
                                station: stationName
                              }
                            }
                          ]}
                          mutation={gql`
                            mutation EditCard(
                              $simulatorId: ID!
                              $station: String!
                              $cardName: String!
                              $newCardName: String
                              $cardComponent: String
                            ) {
                              editSimulatorStationCard(
                                simulatorId: $simulatorId
                                station: $station
                                cardName: $cardName
                                newCardName: $newCardName
                                cardComponent: $cardComponent
                              )
                            }
                          `}
                        >
                          {action => (
                            <Input
                              type="text"
                              defaultValue={card.name}
                              onChange={e =>
                                action({
                                  variables: {
                                    simulatorId,
                                    station: stationName,
                                    cardName: card.name,
                                    newCardName: e.target.value
                                  }
                                })
                              }
                            />
                          )}
                        </Mutation>
                      </td>
                      <td>
                        <Mutation
                          refetchQueries={[
                            {
                              query: STATION_QUERY,
                              variables: {
                                simulatorId,
                                simId: simulatorId,
                                station: stationName
                              }
                            }
                          ]}
                          mutation={gql`
                            mutation EditCard(
                              $simulatorId: ID!
                              $station: String!
                              $cardName: String!
                              $newCardName: String
                              $cardComponent: String
                            ) {
                              editSimulatorStationCard(
                                simulatorId: $simulatorId
                                station: $station
                                cardName: $cardName
                                newCardName: $newCardName
                                cardComponent: $cardComponent
                              )
                            }
                          `}
                        >
                          {action => (
                            <Input
                              type="select"
                              value={card.component}
                              onChange={e =>
                                action({
                                  variables: {
                                    simulatorId,
                                    station: stationName,
                                    cardName: card.name,
                                    cardComponent: e.target.value
                                  }
                                })
                              }
                            >
                              {viewList.map(e => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                              <option disabled>-----------</option>
                              {!loading &&
                                simulators[0].panels.map(p => (
                                  <option key={p} value={p}>
                                    {softwarePanels.find(s => s.id === p) &&
                                      softwarePanels.find(s => s.id === p).name}
                                  </option>
                                ))}
                            </Input>
                          )}
                        </Mutation>
                      </td>
                      <td>
                        <Mutation
                          refetchQueries={[
                            {
                              query: STATION_QUERY,
                              variables: {
                                simulatorId,
                                simId: simulatorId,
                                station: stationName
                              }
                            }
                          ]}
                          mutation={gql`
                            mutation RemoveCard(
                              $simulatorId: ID!
                              $station: String!
                              $cardName: String!
                            ) {
                              removeSimulatorStationCard(
                                simulatorId: $simulatorId
                                station: $station
                                cardName: $cardName
                              )
                            }
                          `}
                          variables={{
                            simulatorId,
                            station: stationName,
                            cardName: card.name
                          }}
                        >
                          {action => (
                            <FontAwesome
                              name="ban"
                              className="text-danger"
                              onClick={action}
                            />
                          )}
                        </Mutation>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <label>Select a component to add a card</label>
            <Mutation
              refetchQueries={[
                {
                  query: STATION_QUERY,
                  variables: {
                    simulatorId,
                    simId: simulatorId,
                    station: stationName
                  }
                }
              ]}
              mutation={gql`
                mutation AddCard(
                  $simulatorId: ID!
                  $station: String!
                  $cardName: String!
                  $cardComponent: String!
                ) {
                  addSimulatorStationCard(
                    simulatorId: $simulatorId
                    station: $station
                    cardName: $cardName
                    cardComponent: $cardComponent
                  )
                }
              `}
            >
              {action => (
                <select
                  className="c-select form-control"
                  value="nothing"
                  onChange={addCard(action)}
                >
                  <option value="nothing">Please Select A Card</option>
                  {viewList.map(e => {
                    return (
                      <option key={e} value={e}>
                        {inSim(e) && "✅ "}
                        {e}
                      </option>
                    );
                  })}
                  <option disabled>-----------</option>
                  {!loading &&
                    simulators[0].panels.map(p => (
                      <option key={p} value={p}>
                        {softwarePanels.find(s => s.id === p) &&
                          softwarePanels.find(s => s.id === p).name}
                      </option>
                    ))}
                </select>
              )}
            </Mutation>
            <label>Message Groups:</label>
            <Row>
              {["SecurityTeams", "DamageTeams", "MedicalTeams"].map(group => (
                <Col sm={4}>
                  <label
                    key={`messageGroup-${group}`}
                    style={{ display: "inline-block" }}
                  >
                    <Mutation
                      refetchQueries={[
                        {
                          query: STATION_QUERY,
                          variables: {
                            simulatorId,
                            simId: simulatorId,
                            station: stationName
                          }
                        }
                      ]}
                      mutation={gql`
                        mutation MessageGroups(
                          $simulatorId: ID!
                          $station: String!
                          $group: String!
                          $state: Boolean!
                        ) {
                          setSimulatorStationMessageGroup(
                            simulatorId: $simulatorId
                            station: $station
                            group: $group
                            state: $state
                          )
                        }
                      `}
                    >
                      {action => (
                        <input
                          type="checkbox"
                          checked={station.messageGroups.indexOf(group) > -1}
                          onChange={evt =>
                            action({
                              variables: {
                                simulatorId,
                                station: stationName,
                                group,
                                state: evt.target.checked
                              }
                            })
                          }
                        />
                      )}
                    </Mutation>{" "}
                    {titleCase(group)}
                  </label>
                </Col>
              ))}
              <ExtraMessageGroups
                simulatorId={simulatorId}
                station={stationName}
                messageGroups={station.messageGroups}
              />
            </Row>
            <label>Widgets:</label>
            <Row>
              {Object.keys(Widgets).map(widget => (
                <Col sm={4}>
                  <label
                    key={`widgets-${widget}`}
                    style={{ display: "inline-block" }}
                  >
                    <Mutation
                      refetchQueries={[
                        {
                          query: STATION_QUERY,
                          variables: {
                            simulatorId,
                            simId: simulatorId,
                            station: stationName
                          }
                        }
                      ]}
                      mutation={gql`
                        mutation Widgets(
                          $simulatorId: ID!
                          $station: String!
                          $widget: String!
                          $state: Boolean!
                        ) {
                          setSimulatorStationWidget(
                            simulatorId: $simulatorId
                            station: $station
                            widget: $widget
                            state: $state
                          )
                        }
                      `}
                    >
                      {action => (
                        <input
                          type="checkbox"
                          checked={station.widgets.indexOf(widget) > -1}
                          onChange={evt =>
                            action({
                              variables: {
                                simulatorId,
                                station: stationName,
                                widget,
                                state: evt.target.checked
                              }
                            })
                          }
                        />
                      )}
                    </Mutation>{" "}
                    {titleCase(widget)}
                  </label>
                </Col>
              ))}
            </Row>
          </div>
        );
      }}
    </Query>
  );
};

class StationConfig extends Component {
  state = {};
  render() {
    const { simulator } = this.props;
    const { selectedStation } = this.state;
    return (
      <Container fluid className="config-container">
        <Row>
          <Col sm={3}>
            <h3>Stations</h3>
            <ListGroup style={{ maxHeight: "80vh" }} className="auto-scroll">
              {simulator.stations.map(s => (
                <ListGroupItem
                  style={{ fontSize: "24px", padding: "0.75rem 1.25rem" }}
                  key={s.name}
                  active={selectedStation === s.name}
                  onClick={() => this.setState({ selectedStation: s.name })}
                >
                  {s.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col sm={5}>
            {selectedStation && (
              <Fragment>
                <h3>{selectedStation}</h3>
                <Card>
                  <CardBody>
                    <Station
                      stations={simulator.stations}
                      simulatorId={simulator.id}
                      station={selectedStation}
                    />
                  </CardBody>
                </Card>
              </Fragment>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default StationConfig;

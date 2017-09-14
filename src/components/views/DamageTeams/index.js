import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  Button,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import Immutable from "immutable";
import { DeckDropdown, RoomDropdown } from "../helpers/shipStructure";

import "./style.scss";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId, position: "damage") {
      id
      name
      position
    }
  }
`;

const DAMAGE_SUB = gql`
  subscription DamageTeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId, type: "damage") {
      id
      name
      orders
      priority
      location {
        ... on Deck {
          id
          number
        }
        ... on Room {
          id
          name
          deck {
            id
            number
          }
        }
      }
      officers {
        id
        name
        position
      }
    }
  }
`;

class DamageTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: {}
    };
    this.subscription = null;
    this.crewSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: DAMAGE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ teams: subscriptionData.data.teamsUpdate })
            .toJS();
        }
      });
    }
    if (!this.crewSubscription && !nextProps.data.loading) {
      this.crewSubscription = nextProps.data.subscribeToMore({
        document: CREW_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ crew: subscriptionData.data.crewUpdate })
            .toJS();
        }
      });
    }
  }
  createDamageTeam = () => {
    const mutation = gql`
      mutation CreateDamageTeam($team: TeamInput!) {
        createTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: "damage",
        simulatorId: this.props.simulator.id
      },
      this.state.selectedTeam
    );
    team.officers = team.officers.reduce(
      (prev, next) => prev.concat(next.id),
      []
    );
    team.location = team.location && team.location.id;
    delete team.id;
    delete team.creating;
    const variables = {
      team
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedTeam: {}
    });
  };
  commitTeam = ({ id, key, value }) => {
    const mutation = gql`
      mutation UpdateDamageTeam($team: TeamInput!) {
        updateTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: "damage",
        simulatorId: this.props.simulator.id
      },
      this.state.selectedTeam
    );
    team.officers = team.officers.reduce(
      (prev, next) => prev.concat(next.id),
      []
    );
    team.location = team.location && team.location.id;
    delete team.__typename;
    const variables = {
      team: team
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  assignOfficer = officer => {
    const { selectedTeam } = this.state;
    this.setState({
      selectedTeam: Object.assign({}, selectedTeam, {
        officers: selectedTeam.officers.concat(officer)
      })
    });
  };
  removeOfficer = ({ id }, teamId) => {
    const { selectedTeam } = this.state;
    this.setState({
      selectedTeam: Object.assign({}, selectedTeam, {
        officers: selectedTeam.officers.filter(o => o.id !== id)
      })
    });
  };
  removeTeam = teamId => {
    this.setState(
      {
        selectedTeam: null
      },
      () => {
        const mutation = gql`
          mutation RemoveTeam($teamId: ID!) {
            removeTeam(teamId: $teamId)
          }
        `;
        const variables = {
          teamId
        };
        this.props.client.mutate({
          mutation,
          variables
        });
      }
    );
  };
  render() {
    if (this.props.data.loading) return null;
    const { teams, crew, decks } = this.props.data;
    const { selectedTeam } = this.state;
    const assignedOfficers = teams
      .concat(selectedTeam)
      .reduce((prev, next) => {
        if (!next) return prev;
        return prev.concat(next.officers || {});
      }, [])
      .map(o => o.id);
    if (crew.length === 0) return <p>Need crew for teams</p>;
    return (
      <Container fluid className="damage-teams">
        <Row>
          <Col sm={3}>
            <Card>
              <CardBlock>
                {teams.map(t =>
                  <p
                    key={t.id}
                    onClick={() => {
                      this.setState({ selectedTeam: t });
                    }}
                    className={
                      selectedTeam && t.id === selectedTeam.id ? "selected" : ""
                    }
                  >
                    {t.name}
                  </p>
                )}
              </CardBlock>
            </Card>
            <Button
              block
              color="success"
              onClick={() =>
                this.setState({
                  selectedTeam: {
                    id: "newTeam",
                    name: "",
                    orders: "",
                    location: null,
                    officers: [],
                    creating: true
                  }
                })}
            >
              New Damage Team
            </Button>
          </Col>
          <Col sm={{ size: 8, offset: 1 }}>
            {(() => {
              if (!selectedTeam) return null;
              if (!selectedTeam.id) return null;
              const team = selectedTeam;
              let deck = {},
                room = {};
              if (team.location) {
                deck = decks.find(d => d.id === team.location.id);
                if (!deck) {
                  room = team.location;
                  deck = room.deck;
                }
              }
              return (
                <Row>
                  <Col xl={5} lg={6}>
                    <FormGroup row>
                      <Label for="teamName" size="lg">
                        Name
                      </Label>
                      <Input
                        onChange={evt =>
                          this.setState({
                            selectedTeam: Object.assign({}, team, {
                              name: evt.target.value
                            })
                          })}
                        type="text"
                        id="teamName"
                        placeholder="New Damage Team"
                        size="lg"
                        value={team.name}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="teamOrders" size="lg">
                        Orders
                      </Label>
                      <Input
                        onChange={evt =>
                          this.setState({
                            selectedTeam: Object.assign({}, team, {
                              orders: evt.target.value
                            })
                          })}
                        type="textarea"
                        id="teamOrders"
                        placeholder=""
                        rows={6}
                        size="lg"
                        value={team.orders}
                      />
                    </FormGroup>
                    <FormGroup className="location-label" row>
                      <Label size="lg">Location</Label>
                    </FormGroup>
                    <Row>
                      <Col sm={5}>
                        <DeckDropdown
                          selectedDeck={deck.id}
                          decks={decks}
                          setSelected={a =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                location: { id: a.deck }
                              })
                            })}
                        />
                      </Col>
                      <Col sm={7}>
                        <RoomDropdown
                          selectedDeck={deck.id}
                          selectedRoom={room.id}
                          decks={decks}
                          setSelected={a =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                location: {
                                  deck: { id: team.location.id },
                                  id: a.room
                                }
                              })
                            })}
                        />
                      </Col>
                    </Row>
                    <FormGroup className="priority-label" row>
                      <Label
                        size="lg"
                        style={{ marginBottom: 0, paddingBottom: 0 }}
                      >
                        Priority
                      </Label>
                    </FormGroup>
                    <Row>
                      <Col sm={5}>
                        <Button
                          onClick={evt =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                priority: "low"
                              })
                            })}
                          active={team.priority === "low"}
                          block
                          color="info"
                        >
                          Low
                        </Button>
                      </Col>
                      <Col sm={7}>
                        <Button
                          onClick={evt =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                priority: "normal"
                              })
                            })}
                          active={team.priority === "normal"}
                          block
                          color="success"
                        >
                          Normal
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Button
                          onClick={evt =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                priority: "critical"
                              })
                            })}
                          active={team.priority === "critical"}
                          block
                          color="warning"
                        >
                          Critical
                        </Button>
                      </Col>
                      <Col sm={6}>
                        <Button
                          onClick={evt =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                priority: "emergency"
                              })
                            })}
                          active={team.priority === "emergency"}
                          block
                          color="danger"
                        >
                          Emergency
                        </Button>
                      </Col>
                    </Row>
                    {team.creating
                      ? <div>
                          <Button
                            block
                            size="lg"
                            color="success"
                            className="recall-button"
                            onClick={() => {
                              this.createDamageTeam(team);
                            }}
                          >
                            Create Damage Team
                          </Button>
                          <Button
                            block
                            size="lg"
                            color="danger"
                            onClick={() => {
                              this.setState({
                                selectedTeam: null
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      : <div>
                          <Button
                            block
                            size="lg"
                            color="success"
                            className="recall-button"
                            onClick={() => {
                              this.commitTeam(team);
                            }}
                          >
                            Update Damage Team
                          </Button>
                          <Button
                            block
                            size="lg"
                            color="danger"
                            onClick={() => {
                              this.removeTeam(team.id);
                            }}
                          >
                            Recall Damage Team
                          </Button>
                        </div>}
                  </Col>
                  <Col
                    xl={{ size: 5, offset: 2 }}
                    lg={{ size: 6 }}
                    className="officers"
                  >
                    <Label for="teamName" size="lg">
                      Available Officers
                    </Label>
                    <Card>
                      <CardBlock>
                        {crew
                          .filter(c => assignedOfficers.indexOf(c.id) === -1)
                          .map(c =>
                            <div
                              className="officer"
                              key={c.id}
                              onClick={() => {
                                this.assignOfficer(c);
                              }}
                            >
                              <p>
                                {c.name}
                              </p>
                              <small>
                                {c.position}
                              </small>
                            </div>
                          )}
                      </CardBlock>
                    </Card>
                    <Label for="teamName" size="lg">
                      Assigned Officers
                    </Label>
                    <Card>
                      <CardBlock>
                        {team &&
                          team.officers &&
                          team.officers.map(c =>
                            <div
                              className="officer"
                              key={c.id}
                              onClick={() => {
                                this.removeOfficer(c);
                              }}
                            >
                              <p>
                                {c.name}
                              </p>
                              <small>
                                {c.position}
                              </small>
                            </div>
                          )}
                      </CardBlock>
                    </Card>
                  </Col>
                </Row>
              );
            })()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const DAMAGE_QUERY = gql`
  query DamageTeams($simulatorId: ID, $simId: ID!) {
    crew(simulatorId: $simulatorId, position: "damage") {
      id
      name
      position
    }
    teams(simulatorId: $simulatorId, type: "damage") {
      id
      name
      orders
      priority
      location {
        ... on Deck {
          id
          number
        }
        ... on Room {
          id
          name
          deck {
            id
            number
          }
        }
      }
      officers {
        id
        name
        position
      }
    }
    decks(simulatorId: $simId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
`;
export default graphql(DAMAGE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(DamageTeams));

import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import Tour from "reactour";
import { DeckDropdown, RoomDropdown } from "../helpers/shipStructure";

import "./style.css";

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

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "There are officers on the ship assigned to repair and maintain the ship. You are responsible for keeping track of damage and maintenance and assigning these officers to handle those problems."
  },
  {
    selector: ".team-list",
    content:
      "This is the list of all assigned damage teams. If you are just getting started, it should be empty."
  },
  {
    selector: ".new-team",
    content: "Click this button to create a new team."
  },
  {
    selector: ".team-name",
    content:
      "Before the team can be created, we need to fill in some information. Start by naming your damage team. This is what you will use to identify the team later on."
  },
  {
    selector: ".team-orders",
    content:
      "Give your team some orders. This is what they are supposed to do. It could be something repairing a system, running diagnostics, or cleaning up. Your damage reports should tell you what orders to give the teams."
  },
  {
    selector: ".team-location",
    content:
      "You also have to tell your damage team members where to go. You first need to pick a deck. Once you have picked a deck, you can optionally select a room for them to go to. This helps them know exactly where you want them to be."
  },
  {
    selector: ".team-priority",
    content:
      "Some work orders are more important than others. Assign a priority to this team with these buttons."
  },
  {
    selector: ".crew-list",
    content:
      "You have to assign officers to be on the team. Each officer has a specific thing that they are assigned to do, so make sure you choose the right person for the job. Click on the names above to assign those officers to your team. You have a limited number of officers, and they can only be assigned to one team at a time, so use them carefully."
  },
  {
    selector: ".crew-assigned",
    content:
      "This is where your assigned officers show up. If you want to remove an officer from the team, click on the officer's name."
  },
  {
    selector: ".create-button",
    content:
      "Any time you create a team, or whenever you make changes, you have to click the 'Create' or 'Update' button here."
  },
  {
    selector: ".cancel-button",
    content:
      "If you change your mind, or want to recall your officers and remove the team, you can click on the 'Cancel' or 'Recall' button here."
  },
  {
    selector: "#widget-messages",
    content:
      "You can communicate with your damage teams using the messaging widget. You can contact the teams individually, or you can communicate with the damage team station. Be sure you regularly check your messages and respond promptly."
  }
];

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
          return Object.assign({}, previousResult, {
            teams: subscriptionData.teamsUpdate
          });
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
          return Object.assign({}, previousResult, {
            crew: subscriptionData.crewUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
    this.crewSubscription && this.crewSubscription();
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
    if (!teams) return null;
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
            <Card className="team-list">
              <CardBody>
                {teams.map(t => (
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
                ))}
              </CardBody>
            </Card>
            <Button
              block
              color="success"
              className="new-team"
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
          <Col sm={{ size: 8, offset: 1 }} className="damage-team-entry">
            {(() => {
              const team = selectedTeam || {};
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
                    <FormGroup row className="team-name">
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
                        disabled={!team.id}
                        placeholder="New Damage Team"
                        size="lg"
                        value={team.name}
                      />
                    </FormGroup>
                    <FormGroup row className="team-orders">
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
                        disabled={!team.id}
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
                    <Row className="team-location">
                      <Col sm={5}>
                        <DeckDropdown
                          selectedDeck={deck.id}
                          decks={decks}
                          disabled={!team.id}
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
                          disabled={!team.id}
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
                    <Row className="team-priority">
                      <Col sm={5}>
                        <Button
                          onClick={evt =>
                            this.setState({
                              selectedTeam: Object.assign({}, team, {
                                priority: "low"
                              })
                            })}
                          disabled={!team.id}
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
                          disabled={!team.id}
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
                          disabled={!team.id}
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
                          disabled={!team.id}
                          active={team.priority === "emergency"}
                          block
                          color="danger"
                        >
                          Emergency
                        </Button>
                      </Col>
                    </Row>
                    {team.creating ? (
                      <div>
                        <Button
                          block
                          size="lg"
                          color="success"
                          className="create-button recall-button"
                          disabled={!team.id}
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
                          className="cancel-button"
                          disabled={!team.id}
                          onClick={() => {
                            this.setState({
                              selectedTeam: null
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          block
                          size="lg"
                          color="success"
                          disabled={!team.id}
                          className="create-button recall-button"
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
                          className="cancel-button"
                          disabled={!team.id}
                          onClick={() => {
                            this.removeTeam(team.id);
                          }}
                        >
                          Recall Damage Team
                        </Button>
                      </div>
                    )}
                  </Col>
                  <Col
                    xl={{ size: 5, offset: 2 }}
                    lg={{ size: 6 }}
                    className="officers"
                  >
                    <Label for="teamName" size="lg">
                      Available Officers
                    </Label>
                    <Card className="crew-list">
                      <CardBody>
                        {crew
                          .filter(c => assignedOfficers.indexOf(c.id) === -1)
                          .map(c => (
                            <div
                              className="officer"
                              key={c.id}
                              onClick={() => {
                                if (team) {
                                  this.assignOfficer(c);
                                }
                              }}
                            >
                              <p>{c.name}</p>
                              <small>{c.position}</small>
                            </div>
                          ))}
                      </CardBody>
                    </Card>
                    <Label for="teamName" size="lg">
                      Assigned Officers
                    </Label>
                    <Card className="crew-assigned">
                      <CardBody>
                        {team &&
                          team.officers &&
                          team.officers.map(c => (
                            <div
                              className="officer"
                              key={c.id}
                              onClick={() => {
                                if (team) {
                                  this.removeOfficer(c);
                                }
                              }}
                            >
                              <p>{c.name}</p>
                              <small>{c.position}</small>
                            </div>
                          ))}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              );
            })()}
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
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

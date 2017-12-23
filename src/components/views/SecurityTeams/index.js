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
    crewUpdate(simulatorId: $simulatorId, position: "security", killed: false) {
      id
      name
    }
  }
`;

const SECURITY_SUB = gql`
  subscription SecurityTeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId, type: "security") {
      id
      name
      orders
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
        killed
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Security officers are other people on the ship assigned to keep the entire crew safe. You are responsible for understanding what threats are on the ship and assigning security officers to take care of those threats."
  },
  {
    selector: ".team-list",
    content:
      "This is the list of all assigned security teams. If you are just getting started, it should be empty."
  },
  {
    selector: ".new-button",
    content: "Click this button to create a new team."
  },
  {
    selector: ".team-name",
    content:
      "Before the team can be created, we need to fill in some information. Start by naming your security team. This is what you will use to identify the security team later on."
  },
  {
    selector: ".team-orders",
    content:
      "Give your team some orders. This is what they are supposed to do. It could be something like investigating, patroling, taking care of intruders, or guarding something. Your team will obey your orders."
  },
  {
    selector: ".team-location",
    content:
      "You also have to tell your security team members where to go. You first need to pick a deck. Once you have picked a deck, you can optionally select a room for them to go to. This helps them know exactly where you want them to be."
  },
  {
    selector: ".crew-list",
    content:
      "You have to assign officers to be on the team. Otherwise, it will be empty and nothing will happen. Click on the names above to assign those officers to your team. You have a limited number of officers, and they can only be assigned to one team at a time, so use them carefully."
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
      "You can communicate with your security teams using the messaging widget. You can contact the teams individually, or you can communicate with the security station. Be sure you regularly check your messages and respond promptly."
  }
];

class SecurityTeams extends Component {
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
        document: SECURITY_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            teams: subscriptionData.data.teamsUpdate
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
            crew: subscriptionData.data.crewUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
    this.crewSubscription && this.crewSubscription();
  }
  createSecurityTeam = () => {
    const mutation = gql`
      mutation CreateSecurityTeam($team: TeamInput!) {
        createTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: "security",
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
      mutation UpdateSecurityTeam($team: TeamInput!) {
        updateTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: "security",
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
    if (
      this.props.data.loading ||
      !this.props.data.teams ||
      !this.props.data.crew ||
      !this.props.data.decks
    ) {
      return null;
    }
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
      <Container fluid className="security-teams">
        <Row>
          <Col sm={3}>
            <Card>
              <CardBody className="team-list">
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
              className="new-button"
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
                })
              }
            >
              New Security Team
            </Button>
          </Col>
          <Col sm={{ size: 8, offset: 1 }}>
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
                          })
                        }
                        type="text"
                        id="teamName"
                        disabled={!team.id}
                        placeholder="New Security Team"
                        size="lg"
                        value={team.name || ""}
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
                          })
                        }
                        type="textarea"
                        id="teamOrders"
                        disabled={!team.id}
                        placeholder=""
                        rows={10}
                        size="lg"
                        value={team.orders || ""}
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
                            })
                          }
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
                            })
                          }
                        />
                      </Col>
                    </Row>
                    {team.creating ? (
                      <div>
                        <Button
                          block
                          size="lg"
                          color="success"
                          className="recall-button create-button"
                          disabled={!team.id || team.officers.length === 0}
                          onClick={() => {
                            this.createSecurityTeam(team);
                          }}
                        >
                          Create Security Team
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
                          className="recall-button create-button"
                          disabled={!team.id || team.officers.length === 0}
                          onClick={() => {
                            this.commitTeam(team);
                          }}
                        >
                          Update Security Team
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
                          Recall Security Team
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
                            <p
                              key={c.id}
                              onClick={() => {
                                team.id && this.assignOfficer(c);
                              }}
                            >
                              {c.name}
                            </p>
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
                            <p
                              key={c.id}
                              onClick={() => {
                                team.id && this.removeOfficer(c);
                              }}
                              className={c.killed ? "text-danger" : ""}
                            >
                              {c.name}
                            </p>
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

const SECURITY_QUERY = gql`
  query SecurityTeams($simulatorId: ID, $simId: ID!) {
    crew(simulatorId: $simulatorId, position: "security", killed: false) {
      id
      name
    }
    teams(simulatorId: $simulatorId, type: "security") {
      id
      name
      orders
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
        killed
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
export default graphql(SECURITY_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(SecurityTeams));

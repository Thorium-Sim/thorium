import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Label, Button } from "reactstrap";

import "./style.css";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId, position: "security") {
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

class SecurityTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: null
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
  removeTeam = teamId => {
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
    this.setState({
      selectedTeam: null
    });
  };
  killCrew = id => {
    const variables = {
      crew: { id, killed: true }
    };
    const mutation = gql`
      mutation UpdateCrew($crew: CrewInput) {
        updateCrewmember(crew: $crew)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.teams ||
      !this.props.data.crew ||
      !this.props.data.decks
    )
      return null;
    const { teams, crew, decks } = this.props.data;
    const { selectedTeam } = this.state;
    if (crew.length === 0) return <p>Need crew for teams</p>;
    return (
      <Container fluid className="security-teams-core">
        <Row>
          <Col sm={6} className="scroller">
            {teams.map(t => (
              <p
                key={t.id}
                onClick={() => {
                  this.setState({ selectedTeam: t.id });
                }}
                className={t.id === selectedTeam ? "selected" : ""}
              >
                {t.name}
              </p>
            ))}
          </Col>
          <Col sm={{ size: 6 }} className="scroller">
            {(() => {
              if (!selectedTeam) return null;
              const team = teams.find(t => t.id === selectedTeam);
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
                <div>
                  <div className="label-section">
                    <Label for="teamName">Name</Label>
                    <p>{team.name}</p>
                  </div>
                  <div className="label-section">
                    <Label for="teamOrders">Orders</Label>
                    <p>{team.orders}</p>
                  </div>
                  <div className="label-section">
                    <Label>Location</Label>
                    <p>
                      {room.name
                        ? `${room.name}, Deck ${deck.number}`
                        : `Deck ${deck.number}`}
                    </p>
                  </div>
                  <div className="label-section">
                    <Label for="teamName">Assigned Officers</Label>
                    {team.officers.map(c => (
                      <p key={c.id} className={c.killed ? "text-danger" : ""}>
                        {c.name}{" "}
                        {!c.killed && (
                          <Button
                            color="warning"
                            size="sm"
                            onClick={() => this.killCrew(c.id)}
                          >
                            Kill
                          </Button>
                        )}
                      </p>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    block
                    color="danger"
                    onClick={() => this.removeTeam(team.id)}
                  >
                    Recall Team
                  </Button>
                </div>
              );
            })()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const SECURITY_QUERY = gql`
  query SecurityTeams($simulatorId: ID, $simId: ID!) {
    crew(simulatorId: $simulatorId, position: "security") {
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

import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Label, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID, $teamType: String!) {
    crewCountUpdate(simulatorId: $simulatorId, position: $teamType)
  }
`;

const TEAMS_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID, $teamType: String) {
    teamsUpdate(simulatorId: $simulatorId, type: $teamType) {
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
        position
        inventory {
          id
          name
          count
        }
      }
    }
  }
`;

class Teams extends Component {
  state = {
    selectedTeam: null
  };
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
  render() {
    if (this.props.data.loading) return null;
    const { teams, crewCount, decks } = this.props.data;
    if (!teams || !decks) return null;
    const { selectedTeam } = this.state;
    if (crewCount === 0) return <p>Need crew for teams</p>;
    return (
      <Container fluid className="damage-teams-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: CREW_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
                teamType: this.props.teamType || "damage"
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crewCount: subscriptionData.data.crewCountUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TEAMS_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
                teamType: this.props.teamType || "damage"
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  teams: subscriptionData.data.teamsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={4} className="scroller">
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
          <Col sm={{ size: 8 }} className="scroller">
            {(() => {
              const team = teams.find(t => t.id === selectedTeam);
              if (!selectedTeam || !team) return null;
              let deck = {};
              let room = {};
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
                        : deck
                        ? `Deck ${deck.number}`
                        : "Unknown"}
                    </p>
                  </div>
                  <div className="label-section">
                    <Label for="teamName">Assigned Officers</Label>
                    {team.officers.filter(Boolean).map(c => (
                      <p key={c.id}>
                        {c.name} - <em>{c.position}</em>
                        <ul className="inventory">
                          {c.inventory.map(i => (
                            <li key={`${c.id}-${i.id}`}>
                              ({i.count}) {i.name}
                            </li>
                          ))}
                        </ul>
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

const TEAMS_QUERY = gql`
  query Teams($simulatorId: ID!, $simId: ID!, $teamType: String!) {
    crewCount(simulatorId: $simulatorId, position: $teamType)
    teams(simulatorId: $simulatorId, type: $teamType) {
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
        position
        inventory {
          id
          name
          count
        }
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
export default graphql(TEAMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id,
      teamType: ownProps.teamType || "damage"
    }
  })
})(withApollo(Teams));

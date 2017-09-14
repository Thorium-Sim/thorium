import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Label, Button } from "reactstrap";
import Immutable from "immutable";

import "./style.scss";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId, position: "damage") {
      id
      name
    }
  }
`;

const DAMAGE_SUB = gql`
  subscription DamageTeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId, type: "damage") {
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
      }
    }
  }
`;

class DamageTeams extends Component {
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
    const { teams, crew, decks } = this.props.data;
    const { selectedTeam } = this.state;
    if (crew.length === 0) return <p>Need crew for teams</p>;
    return (
      <Container fluid className="damage-teams-core">
        <Row>
          <Col sm={6} className="scroller">
            {teams.map(t =>
              <p
                key={t.id}
                onClick={() => {
                  this.setState({ selectedTeam: t.id });
                }}
                className={t.id === selectedTeam ? "selected" : ""}
              >
                {t.name}
              </p>
            )}
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
                    <p>
                      {team.name}
                    </p>
                  </div>
                  <div className="label-section">
                    <Label for="teamOrders">Orders</Label>
                    <p>
                      {team.orders}
                    </p>
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
                    {team.officers.map(c =>
                      <p key={c.id}>
                        {c.name}
                      </p>
                    )}
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

const DAMAGE_QUERY = gql`
  query DamageTeams($simulatorId: ID, $simId: ID!) {
    crew(simulatorId: $simulatorId, position: "damage") {
      id
      name
    }
    teams(simulatorId: $simulatorId, type: "damage") {
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

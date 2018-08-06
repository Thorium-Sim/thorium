import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import Tour from "reactour";
import { titleCase } from "change-case";
import training from "./training";
import TeamConfig from "./teamConfig";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID, $teamType: String!) {
    crewUpdate(simulatorId: $simulatorId, position: $teamType, killed: false) {
      id
      name
      position
    }
  }
`;

const TEAM_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID, $teamType: String!) {
    teamsUpdate(simulatorId: $simulatorId, type: $teamType) {
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
        killed
      }
    }
  }
`;

class Teams extends Component {
  state = {
    selectedTeam: {}
  };
  createTeam = () => {
    const mutation = gql`
      mutation CreateTeam($team: TeamInput!) {
        createTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: this.props.teamType || "damage",
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
      mutation UpdateTeam($team: TeamInput!) {
        updateTeam(team: $team)
      }
    `;
    const team = Object.assign(
      {
        type: this.props.teamType || "damage",
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

    selectedTeam.id &&
      this.setState({
        selectedTeam: Object.assign({}, selectedTeam, {
          officers: selectedTeam.officers.concat(officer)
        })
      });
  };
  removeOfficer = ({ id }, teamId) => {
    const { selectedTeam } = this.state;
    selectedTeam.id &&
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
    const {
      data: { loading, teams, crew, decks },
      teamType = "damage"
    } = this.props;
    if (loading || !teams || !crew || !decks) return null;
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
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TEAM_SUB,
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
                  crew: subscriptionData.data.crewUpdate
                });
              }
            })
          }
        />
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
                })
              }
            >
              New {titleCase(teamType)} Team
            </Button>
          </Col>
          <Col sm={{ size: 8, offset: 1 }} className="damage-team-entry">
            <TeamConfig
              selectedTeam={selectedTeam}
              decks={decks}
              teamType={teamType}
              crew={crew}
              assignedOfficers={assignedOfficers}
              update={team => this.setState({ selectedTeam: team })}
              createTeam={this.createTeam}
              commitTeam={this.commitTeam}
              assignOfficer={this.assignOfficer}
              removeOfficer={this.removeOfficer}
              removeTeam={this.removeTeam}
            />
          </Col>
        </Row>
        <Tour
          steps={training[teamType]}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const TEAMS_QUERY = gql`
  query Teams($simulatorId: ID, $simId: ID!, $teamType: String!) {
    crew(simulatorId: $simulatorId, position: $teamType, killed: false) {
      id
      name
      position
    }
    teams(simulatorId: $simulatorId, type: $teamType) {
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
export default graphql(TEAMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      teamType: ownProps.teamType || "damage",
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(Teams));

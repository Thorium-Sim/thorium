import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBlock } from "reactstrap";
import "./style.css";

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID, $teamType: String!) {
    crewUpdate(simulatorId: $simulatorId, position: $teamType, killed: false) {
      id
      name
      inventory {
        id
        name
        count
      }
    }
  }
`;

const TEAM_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID, $teamType: String!) {
    teamsUpdate(simulatorId: $simulatorId, type: $teamType) {
      id
      name
      officers {
        id
        #We'll pull the other officer data out of the crew
      }
    }
  }
`;

const ROOMS_SUB = gql`
  subscription RoomsUpdate($simulatorId: ID!, $roomRole: RoomRoles) {
    roomsUpdate(simulatorId: $simulatorId, role: $roomRole) {
      id
      name
      deck {
        number
      }
      inventory {
        id
        name
        count
      }
    }
  }
`;

class Armory extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TEAM_SUB,
        variables: {
          simulatorId: nextProps.simulator.id,
          teamType: nextProps.type || "damage"
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
          simulatorId: nextProps.simulator.id,
          teamType: nextProps.type || "damage"
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            crew: subscriptionData.data.crewUpdate
          });
        }
      });
    }
    if (!this.roomSubscription && !nextProps.data.loading) {
      this.roomSubscription = nextProps.data.subscribeToMore({
        document: ROOMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id,
          roomRole: nextProps.teamType ? `${nextProps.type}Team` : "damageTeam"
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            rooms: subscriptionData.data.roomsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
    this.crewSubscription && this.crewSubscription();
  }
  render() {
    const { data: { loading, crew, rooms, teams } } = this.props;
    if (loading || !crew || !rooms || !teams) return null;
    return (
      <Container className="armory-card">
        <Row>
          <Col sm={4} />
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Armory($simulatorId: ID!, $type: String!, $roomRole: RoomRoles!) {
    crew(simulatorId: $simulatorId, position: $type) {
      id
      name
      inventory {
        id
        name
        count
      }
    }
    rooms(simulatorId: $simulatorId, role: $roomRole) {
      id
      deck {
        number
      }
      name
      inventory {
        id
        name
        count
      }
    }
    teams(simulatorId: $simulatorId, type: $type) {
      id
      name
      officers {
        id
        #We'll pull the other officer data out of the crew
      }
    }
  }
`;
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
      type: ownProps.type || "damage",
      roomRole: `${ownProps.type}Team` || "damageTeam"
    }
  })
})(withApollo(Armory));

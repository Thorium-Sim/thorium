import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
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
  state = { room: null, team: null };

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
          teamType: nextProps.type || "security"
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
          roomRole: nextProps.type ? `${nextProps.type}Team` : "securityTeam"
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            rooms: subscriptionData.data.roomsUpdate
          });
        }
      });
    }
    if (
      !nextProps.data.loading &&
      nextProps.data.rooms &&
      !this.state.room &&
      nextProps.data.rooms[0]
    ) {
      this.setState({
        room: nextProps.data.rooms[0].id
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
    const { room, team } = this.state;
    const roomObj = rooms.find(r => r.id === room);
    return (
      <Container fluid className="armory-card">
        <Row>
          <Col sm={3}>
            <UncontrolledDropdown>
              <DropdownToggle block caret>
                {roomObj
                  ? `${roomObj.name}, Deck ${roomObj.deck.number}`
                  : "No Room Selected"}
              </DropdownToggle>
              <DropdownMenu style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {rooms
                  .concat()
                  .sort((a, b) => {
                    if (a.deck.number < b.deck.number) return -1;
                    if (b.deck.number < a.deck.number) return 1;
                    return 0;
                  })
                  .map(r => (
                    <DropdownItem
                      key={r.id}
                      onClick={() => this.setState({ room: r.id })}
                    >{`${r.name}, Deck ${r.deck.number}`}</DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <h4>Equipment Hold Contents</h4>
            <Card className="inventory-list">
              <CardBody>
                {roomObj &&
                  roomObj.inventory
                    .filter(i => i.count > 0)
                    .map(i => (
                      <p
                        key={i.id}
                        className="armory-equipment"
                        onClick={() => {}}
                      >{`${i.name} (${i.count})`}</p>
                    ))}
              </CardBody>
            </Card>
            <h4>Ready Equipment</h4>
            <Card className="inventory-list">
              <CardBody>
                {roomObj &&
                  roomObj.inventory
                    .filter(i => i.count > 0)
                    .map(i => (
                      <p
                        key={i.id}
                        className="armory-equipment"
                        onClick={() => {}}
                      >{`${i.name} (${i.count})`}</p>
                    ))}
              </CardBody>
            </Card>
            <Button block>Transfer to Officer</Button>
          </Col>
          <Col sm={{ size: 7, offset: 2 }}>
            <Row>
              <Col sm={6}>
                <h4>Teams</h4>
                <UncontrolledDropdown>
                  <DropdownToggle block caret>
                    {team
                      ? teams.find(t => t.id === team).name
                      : "Unassigned Officers"}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                  >
                    <DropdownItem onClick={() => this.setState({ team: null })}>
                      Unassigned Officers
                    </DropdownItem>
                    {teams.map(t => (
                      <DropdownItem
                        key={t.id}
                        onClick={() => this.setState({ team: t.id })}
                      >
                        {t.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Card className="inventory-list">
                  <CardBody>
                    <TeamList team={team} teams={teams} crew={crew} />
                  </CardBody>
                </Card>
              </Col>
              <Col sm={6}>
                <h4>Officers</h4>
                <Card className="inventory-list">
                  <CardBody />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const TeamList = ({ team, teams, crew }) => {
  if (team) {
    return teams
      .find(t => t.id === team)
      .officers.map(o => crew.find(c => c.id === o.id))
      .map(o => <p key={`crew-${o.name}`}>{o.name}</p>);
  }
  const officers = teams.reduce((prev, next) => {
    return prev.concat(next.officers.map(o => o.id));
  }, []);
  return crew
    .filter(c => officers.indexOf(c.id) === -1)
    .map(o => <p key={`crew-${o.name}`}>{o.name}</p>);
};
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
      type: ownProps.type || "security",
      roomRole: ownProps.type ? `${ownProps.type}Team` : "securityTeam"
    }
  })
})(withApollo(Armory));

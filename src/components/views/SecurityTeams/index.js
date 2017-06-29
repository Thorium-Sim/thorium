import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Container, Row, Col, Card, CardBlock, Button, Input, Label, FormGroup } from 'reactstrap'
import Immutable from 'immutable';
import {DeckDropdown, RoomDropdown} from '../helpers/shipStructure';

import './style.scss';

const CREW_SUB = gql`
subscription CrewUpdate($simulatorId: ID) {
  crewUpdate(simulatorId: $simulatorId, position: "security") {
    id
    name
  }
}`;

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

class SecurityTeams extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: null
    }
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
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ teams: subscriptionData.data.teamsUpdate }).toJS();
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
          return returnResult.merge({ crew: subscriptionData.data.crewUpdate }).toJS();
        }
      });
    }
  }
  createSecurityTeam = () => {
    const mutation = gql`
    mutation CreateSecurityTeam($team: TeamInput!) {
      createTeam(team: $team)
    }`;
    const variables = {
      team: {
        type: "security",
        simulatorId: this.props.simulator.id,
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  updateSecurityTeam = ({id, key, value}) => {
    const mutation = gql`
    mutation UpdateSecurityTeam($team: TeamInput!) {
      updateTeam(team: $team)
    }`;
    const obj = {id};
    obj[key] = value;
    const variables = {
      team: obj
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const {teams, crew, decks} = this.props.data;
    const {selectedTeam} = this.state;
    if (crew.length === 0) return <p>Need crew for teams</p>
      return <Container fluid className="security-teams">
    <Row>
    <Col sm={3}>
    <Card>
    <CardBlock>
    {teams.map(t => <p 
      key={t.id} 
      onClick={() => {this.setState({selectedTeam: t.id})}} 
      className={t.id === selectedTeam ? 'selected' : ''}>
      {t.name}
      </p>)}
    </CardBlock>
    </Card>
    <Button block color="success" onClick={this.createSecurityTeam}>New Security Team</Button>
    </Col>
    <Col sm={{size: 8, offset: 1}}>
    {(() => {
      if (!selectedTeam) return null;
      const team = teams.find(t => t.id === selectedTeam);
      return <Row>
      <Col sm={5}>
      <FormGroup row>
      <Label for="teamName" size="lg">Name</Label>
      <Input onChange={(evt) => this.updateSecurityTeam({id: team.id, key: "name", value: evt.target.value})} type="text" id="teamName" placeholder="New Security Team" size="lg" value={team.name} />
      </FormGroup>
      <FormGroup row>
      <Label for="teamOrders" size="lg">Orders</Label>
      <Input onChange={(evt) => this.updateSecurityTeam({id: team.id, key: "orders", value: evt.target.value})} type="textarea" id="teamOrders" placeholder="" size="lg" value={team.orders} />
      </FormGroup>
      <FormGroup row>
      <Label size="lg">Location</Label>
      </FormGroup>
      <Row>
      <Col sm={5}>
      <DeckDropdown 
      selectedDeck={null}
      decks={decks}
      setSelected={() => {}}/>
      </Col>
      <Col sm={7}>
      <RoomDropdown
      selectedDeck={null}
      selectedRoom={null}
      decks={decks}
      setSelected={() => {}} />
      </Col>
      </Row>
      </Col>
      <Col sm={{size: 5, offset: 2}} className="officers">
      <Label for="teamName" size="lg">Available Officers</Label>
      <Card>
      <CardBlock>
      {crew.map(c => <p key={c.id}>{c.name}</p>)}
      </CardBlock>
      </Card>
      <Label for="teamName" size="lg">Assigned Officers</Label>
      <Card>
      <CardBlock>
      {team.officers.map(c => <p key={c.id}>{c.name}</p>)}
      </CardBlock>
      </Card>
      </Col>
      </Row>
    })()

  }
  </Col>
  </Row>
  </Container>
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
export default graphql(SECURITY_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(SecurityTeams));
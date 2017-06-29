import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Container, Row, Col, Card, CardBlock, Button } from 'reactstrap'
import Immutable from 'immutable';
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
  render(){
    return <Container fluid className="security-teams">
    <Row>
    <Col sm={3}>
    <Card>
    <CardBlock>
    
    </CardBlock>
    </Card>
    <Button block color="success">New Security Team</Button>
    </Col>
    <Col sm={9}>

    </Col>
    </Row>
    </Container>
  }
}

const SECURITY_QUERY = gql`
query SecurityTeams($simulatorId: ID) {
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
}
`;
export default graphql(SECURITY_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(SecurityTeams));
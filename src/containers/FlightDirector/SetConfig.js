import React, {Component} from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Link } from 'react-router';

const SIMULATOR_SUB = gql`subscription SimulatorsUpdate {
  simulatorsUpdate(template: true) {
    id
    name
    layout
    systems {
      id
      type
    }
    stationSets {
      id
      name
      stations {
        name
        cards {
          name
          component
        }
      }
    }
  }
}`;

class SetConfig extends Component {
  subscription = null;
  state = {};
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SIMULATOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          return Object.assign({}, previousResult, {simulators: subscriptionData.data.simulatorsUpdate});
        },
      });
    }
  }
  render() {
    const {data} = this.props;
    if (data.loading) return null;
    const {simulators, sets, stationSets} = data;
    return <Container className="set-config">
    <h4>Set Config <small><Link to="/">Return to Main</Link></small></h4>
    <Row>
    <Col sm={3}>

    </Col>
    <Col sm={3}>

    </Col>
    </Row>
    </Container>
  }
}

const SIMULATOR_QUERY = gql `
query Simulators {
  simulators(template: true) {
    id
    name
    layout
    systems {
      id
      type
    }
    stationSets {
      id
      name
      stations {
        name
        cards {
          name
          component
        }
      }
    }
  }
}`;

export default graphql(SIMULATOR_QUERY)(withApollo(SetConfig));

import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Input } from 'reactstrap';
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
  addClient = (e) => {

  }
  render() {
    const {data} = this.props;
    if (data.loading) return null;
    const {selectedSet, selectedClient} = this.state;
    const {clients, simulators, sets, stationSets} = data;
    const selectedSetObj = sets.find(s => s.id === selectedSet) || {};
    return <Container className="set-config">
    <h4>Set Config <small><Link to="/">Return to Main</Link></small></h4>
    <Row>
    <Col sm={2}>
    <h5>Sets</h5>
    <Card>
    {sets.map(s => <li key={s.id}
      className={`list-group-item ${selectedSet ? 'selected' : ''}`}
      onClick={() => this.setState({selectedSet: s.id})}>{s.name}</li>)}
    </Card>
    <Button block color="primary">Add Set</Button>
    </Col>
    <Col sm={2}>
    <h5>Clients</h5>
    <Card>
    {selectedSetObj.clients.map(s => <li key={s.id}
      className={`list-group-item ${selectedClient ? 'selected' : ''}`}
      onClick={() => this.setState({selectedSet: s.id})}>{s.id}</li>)}
    </Card>
    <Input type="select" value="label" onChange={this.addClient}>
    <option value="label" disabled>Select a Client</option>
    {clients.filter(c => selectedSetObj.clients.findIndex(client => client.id === c.id) === -1)
      .map(c => <option key={c.id} value={c.id}>{c.id}</option>)
    }
    </Input>
    </Col>
    <Col sm={2}>
    <h5>Simulators</h5>
    <Card>
    </Card>
    </Col>
    <Col sm={2}>
    <h5>Station Sets</h5>
    <Card>
    </Card>
    </Col>
    <Col sm={2}>
    <h5>Station</h5>
    <Card>
    </Card>
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

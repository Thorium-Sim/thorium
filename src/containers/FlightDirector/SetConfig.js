import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Input } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Link } from 'react-router';

import './setConfig.scss';

/*const SIMULATOR_SUB = gql`subscription SimulatorsUpdate {
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
}`;*/

class SetConfig extends Component {
  subscription = null;
  state = {};
 /* componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SIMULATOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          return Object.assign({}, previousResult, {simulators: subscriptionData.data.simulatorsUpdate});
        },
      });
    }
  }*/
  addClient = () => {
    const name = prompt('What is the name of the set?');
    if (name) {
      const mutation = gql`mutation AddSet($name: String!) {
        createSet(name: $name)
      }`;
      const variables = {
        name
      }
      this.props.client.mutate({
        mutation,
        variables,
        refetchQueries: ['Sets']
      })
    }
  }
  render() {
    const {data} = this.props;
    if (data.loading) return null;
    const {selectedSet, selectedClient, selectedSimulator, selectedStationSet, selectedStation} = this.state;
    const {clients, simulators, sets} = data;
    return <Container fluid className="set-config">
    <h4>Set Config <small><Link to="/">Return to Main</Link></small></h4>
    <Row>
    <Col>
    <h5>Sets</h5>
    <Card>
    {sets.map(s => <li key={s.id}
      className={`list-group-item ${selectedSet ? 'selected' : ''}`}
      onClick={() => this.setState({selectedSet: s.id})}>{s.name}</li>)}
    </Card>
    <Button block color="primary" onClick={this.addClient}>Add Set</Button>
    </Col>
    <Col>
    <h5>Simulators</h5>
    {
      selectedSet && <Card>
      {simulators.map(s => <li key={s.id}
        className={`list-group-item ${selectedSimulator ? 'selected' : ''}`}
        onClick={() => this.setState({selectedSimulator: s.id})}>{s.name}</li>)}
      </Card>
    }
    </Col>
    <Col>
    <h5>Station Sets</h5>
    {
      selectedSimulator && <Card>
      {
        simulators.find(s => s.id === selectedSimulator).stationSets.map(s => <li key={s.id}
          className={`list-group-item ${selectedStationSet ? 'selected' : ''}`}
          onClick={() => this.setState({selectedStationSet: s.id})}>{s.name}</li>)
      }
      </Card>
    }
    </Col>
    <Col>
    <h5>Station</h5>
    {
      selectedSimulator && selectedStationSet && <Card>
      {
        simulators.find(s => s.id === selectedSimulator).stationSets.find(s => s.id === selectedStationSet).stations.map(s => <li key={`station-${s.name}`}
          className={`list-group-item ${selectedStation ? 'selected' : ''}`}
          onClick={() => this.setState({selectedStation: s.name})}>{s.name}</li>)
      }
      </Card>
    }
    </Col>
    <Col>
    <h5>Clients</h5>
    {
      selectedSimulator && selectedStationSet && selectedStation &&  <Card>
      {clients.map(s => <li key={s.id}
        className={`list-group-item ${selectedClient ? 'selected' : ''}`}
        onClick={() => this.setState({selectedSet: s.id})}>
        <label disabled><Input type="checkbox" />
        {s.id}</label>
        </li>)}
      </Card>
    }
    </Col>
    </Row>
    </Container>
  }
}

const SIMULATOR_QUERY = gql `
query Sets {
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
      }
    }
  }
  sets {
    id
    name
    clients {
      id
      client {
        id
      }
      simulator {
        id
        name
      }
      stationSet {
        id
        name
      }
      station
    }
  }
  clients {
    id
  }
}`;

export default graphql(SIMULATOR_QUERY)(withApollo(SetConfig));

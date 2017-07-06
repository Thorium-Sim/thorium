import React, { Component } from 'react';
import { Button, Col, Row, Container } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import moment from 'moment';

const CLIENT_CHANGE_QUERY = gql`
subscription ClientChanged {
  clientChanged {
    id
    flight {
      id
      name
      date
      simulators {
        id
        name
      }
    }
    simulator {
      id
      name
      alertlevel
      layout
      stations {
        name
      }
    }
    station {
      name
    }
    loginName
    loginState
  }
}
`;

class Clients extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: CLIENT_CHANGE_QUERY,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Object.assign({}, previousResult);
          returnResult.clients = subscriptionData.data.clientChanged;
          return returnResult;
        },
      });
    }
  }
  _select(p, type, e) {
    const mutation = gql`mutation UpdateClient($client: ID!, $id: ID!) {
      ${(() => {
        if (type === 'flight') return 'clientSetFlight(client: $client, flightId: $id)}';
        if (type === 'simulator') return 'clientSetSimulator(client: $client, simulatorId: $id)}';
        if (type === 'station') return 'clientSetStation(client: $client, stationName: $id)}';
      })()
    }`;
    const obj = {
      client: p.id,
      id: e.target.value
    }
    this.props.client.mutate({
      mutation: mutation,
      variables: obj
    })
  }
  render() {
    return (<Container><Row className="justify-content-md-center"><Col xs="12">
      <h4>Clients</h4>
      <table className="table table-striped table-hover table-sm">
      <thead>
      <tr>
      <th>Client Name</th>
      <th>Flight</th>
      <th>Simulator</th>
      <th>Station</th>
      <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      { !this.props.data.loading
        ? this.props.data.clients.map((p, index) => (
          <tr key={ `flight-${p.id}-${index}` }>
          <td>
          { `${p.id}` }
          </td>
          <td>
          <select value={p.flight && p.flight.id} onChange={ this._select.bind(this, p, 'flight') } className="form-control-sm c-select">
          <option>Select a flight</option>
          { this.props.data.flights ?
            this.props.data.flights.map(f => {
              return <option key={ `flight-${p.id}-${f}` } value={ f.id }>
              { `${f.name}: ${moment(f.date).format('MM/DD/YY hh:mma')}` }
              </option>;
            })
            : <option disabled>No Flights</option> }
            </select>
            </td>
            <td>
            <select value={p.simulator && p.simulator.id} onChange={ this._select.bind(this, p, 'simulator') } className="form-control-sm c-select">
            <option>Select a simulator</option>
            { p.flight ?
              p.flight.simulators.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
                )) : <option disabled>No Simulators</option>
            }
            </select>
            </td>
            <td>
            <select value={p.station && p.station.name} onChange={ this._select.bind(this, p, 'station') } className="form-control-sm c-select">
            <option>Select a station</option>
            { p.simulator ?
              p.simulator.stations.map(s => (
                <option key={`${p.id}-station-${s.name}`} value={s.name} >{s.name}</option>))
              : <option disabled>No Stations</option>
            }
            </select>
            </td>
            <td>
            <Button color="primary" title="This saves the current simulator and station setting and persists it for future flights." size="sm">Save</Button>
            <Button color="danger" title="This removes the saved state." size="sm">Reset</Button>
            </td>
            </tr>
            ))
        : <tr></tr> }
        </tbody>
        </table>
        </Col></Row></Container>)
  }
}

const CLIENTS_QUERY = gql`
query Clients {
  clients {
    id
    flight {
      id
      name
      date
      simulators {
        id
        name
      }
    }
    simulator {
      id
      name
      alertlevel
      layout
      stations {
        name
      }
    }
    station {
      name
    }
    loginName
    loginState
  }
  flights {
    id
    name
    date
    simulators {
      id
      name
      stations {
        name
      }
    }
  }
}`;

export default graphql(CLIENTS_QUERY)(withApollo(Clients));

import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row, Col, Button, Container } from 'reactstrap';
import MissionModal from './MissionModal';

const FLIGHT_SUB = gql`subscription FlightsChanged {
  flightsUpdate {
    id
    name
    date
    mission {
      name
    }
    simulators {
      id
      name
      stations {
        name
      }
    }
  }
}`;

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
    this.toggle = this.toggle.bind(this);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Object.assign({}, previousResult);
          returnResult.flights = subscriptionData.data.flightsUpdate;
          return returnResult;
        },
      });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (<Container>
      <h4>Flights
      <Button color="success" size="sm" onClick={this.toggle}>Create Flight</Button></h4>
      {this.props.data.loading || !this.props.data.flights ? <h4>Loading...</h4>
        : this.props.data.flights.map((flight) => {
          return <Row key={flight.id}>
          <Col sm="12">
          <h4>{flight.name} - {flight.date}</h4>
          </Col>
          {flight.simulators.map((simulator) => {
            return <Col key={simulator.id} sm="12">
            <h5>{simulator.name}</h5>
            {simulator.stations.map((station) => {
             return <Col key={`${simulator.id}-${station.name}`} sm="6">
             <label>{station.name}</label>
             <select>
             <option value={null}>Select a client</option>
             {this.props.data.clients.map((client) => {
              return <option value={client.id}>{client.id}</option>
            })}
             </select>
             </Col>;
           })}
            </Col>;
          })}
          </Row>;
        })
      }
      {
        this.state.modal ?
        <MissionModal
        modal={this.state.modal}
        toggle={this.toggle.bind(this)}
        />
        : <span />
      }
      </Container>);
  }
}

const FLIGHTS_QUERY = gql `
query Flights {
  flights {
    id
    name
    date
    mission {
      name
    }
    simulators {
      id
      name
      stations {
        name
      }
    }
  }
  clients {
    id
    flight {
      id
      name
      date
    }
    simulator {
      id
      name
      alertlevel
      layout
    }
    station {
      name
      cards{
        name
        component
        icon
      }
    }
    loginName
    loginState
  }
}`;

export default graphql(FLIGHTS_QUERY)(Flights);

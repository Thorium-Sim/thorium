import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Link } from 'react-router';
import { Col, Row, Container, Button, Card, Tooltip, FormGroup, Label, Input } from 'reactstrap';
import { browserHistory } from 'react-router'

import randomWords from 'random-words';

import './flightConfig.scss';

class FlightConfig extends Component {
  state = {
    name: randomWords(3).join('-'),
    selectedSimulator: null,
    selectedStation: null,
    selectedMission: null,
    flightConfig: []
  }
  addToFlight = () => {
    const {selectedSimulator, selectedStation, selectedMission, flightConfig} = this.state;
    this.setState({
      flightConfig: flightConfig.concat({
        simulatorId:selectedSimulator,
        stationSet: selectedStation,
        missionId: selectedMission
      }),
      selectedSimulator: null,
      selectedStation: null,
      selectedMission: null,
    })
  }
  startFlight = () => {
    const {name, flightConfig} = this.state;
    const mutation = gql`mutation StartFlight($name: String!, $simulators: [SimulatorInput!]!) {
      startFlight(name: $name, simulators: $simulators)
    }`;
    const variables = {
      name,
      simulators: flightConfig
    }
    this.props.client.mutate({
      mutation,
      variables
    }).then(({data: {startFlight: flightId}}) => {
      browserHistory.push(`/flight/${flightId}`)
    })
  }
  render() {
    if (this.props.data.loading) return null;
    const {name, selectedSimulator, selectedStation, selectedMission, flightConfig} = this.state;
    const {simulators, missions} = this.props.data;
    const selectedSimObj = simulators.find(s => s.id === selectedSimulator) || {};
    return <Container className="flight-config">
    <h4>Flight Config <small><Link to="/">Return to Main</Link></small></h4>
    <FormGroup>
    <Label>Name
    <Input type="text" value={name} onChange={(e) => this.setState({name: e.target.value})} />
    </Label>
    </FormGroup>
    <Row>
    <Col sm={3}>
    <h5>Pick a simulator</h5>
    <Card class="scroll">
    {simulators.map(s => <li key={s.id}
      onClick={() => this.setState({selectedStation: null, selectedSimulator: s.id})}
      className={`list-group-item ${s.id === selectedSimulator ? 'selected' : ''}`}>{s.name}</li>)}
    </Card>
    </Col>
    <Col sm={3}>
    {selectedSimulator &&
      <div>
      <h5>Pick a station set</h5>
      <Card class="scroll">
      {selectedSimObj.stationSets.map(s => <TooltipList onClick={() => this.setState({selectedStation: s.id})} selected={s.id === selectedStation} key={s.id} id={s.id} content={s.name} tooltip={s.stations.map(st => st.name).join(', ')} />)}
      </Card>
      </div>
    }
    </Col>
    <Col sm={3}>
    {selectedStation && 
      <div>
      <h5>Pick a mission</h5>
      <Card class="scroll">
      {missions.map(m => <TooltipList onClick={() => this.setState({selectedMission: m.id})} selected={m.id === selectedMission} key={m.id} id={m.id} content={m.name} tooltip={m.description} />)}
      </Card>
      {selectedMission ? <Button size="sm" block color="info" onClick={this.addToFlight}>Continue</Button>
      :
      <Button size="sm" block color="primary" onClick={this.addToFlight}>Skip</Button>}
      </div>
    }
    </Col>
    {flightConfig.length > 0 &&
      <Col sm={3}>
      <h5>Current Config</h5>
      <Card>
      {
        flightConfig.map((f, i) => <ul key={`flight-config-${i}`}>
          <li><strong>Simulator</strong>: {simulators.find(s => s.id === f.simulatorId).name}</li>
          <li><strong>Stations</strong>: {simulators.find(s => s.id === f.simulatorId).stationSets.find(s => s.id === f.stationSet).name}</li>
          {f.missionId && <li><strong>Mission</strong>: {missions.find(m => m.id === f.missionId).name}</li>}
          </ul>)
      }
      </Card>
      <Button size="lg" block color="success" onClick={this.startFlight}>Start Flight</Button>
      </Col>
    }
    </Row>
    </Container>
  }
}

class TooltipList extends Component {
  state = {tooltipOpen: false}
  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }
  render() {
    const {tooltipOpen} = this.state;
    const {content, tooltip, id, selected, onClick} = this.props;
    return <li
    id={id}
    onClick={onClick}
    className={`list-group-item ${selected ? 'selected' : ''}`}>
    <span>{content}</span>
    <Tooltip placement="right" isOpen={tooltipOpen} target={id} toggle={this.toggle}>
    {tooltip}
    </Tooltip>
    </li>
  }
}
const FLIGHT_QUERY = gql`
query FlightSetup {
  simulators(template: true) {
    id
    name
    stationSets {
      id
      name
      stations {
        name
      }
    }
  }
  missions {
    id
    name
    description
  }
}`;

export default graphql(FLIGHT_QUERY)(withApollo(FlightConfig));

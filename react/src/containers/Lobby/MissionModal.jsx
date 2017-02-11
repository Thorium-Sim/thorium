import React, {Component} from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

class MissionModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMission: {},
      simulatorSelect: [],
    };
  }
  selectMission(mission) {
    if (this.state.selectedMission.id === mission.id) {
      this.setState({selectedMission: undefined});
    } else {
      this.setState({selectedMission: mission});
    }
  }
  _selectMissionSimulator(sim, e) {
    const { simulatorSelect } = this.state;
    const thisSim = simulatorSelect.findIndex(s => s.missionSim === sim.id);
    if (thisSim > -1) {
      // Update it
      simulatorSelect[thisSim].simulator = e.target.value;
    } else {
      simulatorSelect.push({
        missionSim: sim.id,
        simulator: e.target.value,
        stationSet: null
      })
    }
    this.setState({
      simulatorSelect
    })
  }
  _selectMissionStation(sim, e) {
    const { simulatorSelect } = this.state;
    const thisSim = simulatorSelect.findIndex(s => s.missionSim === sim.id);
    if (thisSim > -1) {
      // Update it
      simulatorSelect[thisSim].stationSet = e.target.value;
    }
    this.setState({
      simulatorSelect
    })
  }
  loadFlight() {
    const { selectedMission, simulatorSelect } = this.state;
    const obj = {
      missionId: selectedMission.id,
      simulators: simulatorSelect
    };
    const mutation = gql`mutation StartFlight($missionId: ID!, $simulators: [FlightSimulatorInput]!) {
      startFlight(missionId: $missionId, simulators: $simulators)
    }`;
    this.props.client.mutate({
      mutation: mutation,
      variables: obj
    })
    this.props.toggle()
  }
  render(){
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="large">
      <ModalHeader toggle={this.props.toggle}>Create A New Flight</ModalHeader>
      <ModalBody>
      <Row>
      <Col sm="6">
      <h4>Choose a mission</h4>
      <table className="table table-striped table-hover table-sm">
      <thead>
      <tr>
      <th>Name</th>
      <th>Simulators</th>
      </tr>
      </thead>
      <tbody>
      {this.props.data.loading ? <tr><td>Loading...</td><td></td></tr>
        : this.props.data.missions.map((mission) => {
          return (<tr onClick={this.selectMission.bind(this,mission)} className={this.state.selectedMission.id === mission.id ? 'table-success' : ''} key={mission.id}>
            <td>{mission.name}</td>
            <td>{mission.simulators.length}</td>
            </tr>);
        })
      }
      </tbody>
      </table>
      </Col>
      <Col sm="6">
      <h4>Or reload a saved flight</h4>
      <table className="table table-striped table-hover table-sm">
      <thead>
      <tr>
      <th>Date</th>
      <th>Mission</th>
      <th>Simulators</th>
      </tr>
      </thead>
      <tbody></tbody>
      </table>
      </Col>
      </Row>
      {
        this.state.selectedMission.id ? this.state.selectedMission.simulators.map((e, index) => {
          return (
            <Row key={e.id}>
            <Col sm="4">
            <small>{e.name}</small>
            </Col>
            <Col sm="4">
            <select onChange={this._selectMissionSimulator.bind(this, e)} className="c-select form-control">
            <option value={null}>Select a simulator</option>
            {
              this.props.data.simulators.map((sim) => {
                return <option key={sim.id} value={sim.id}>{sim.name}</option>;
              })
            }
            </select>
            </Col>
            <Col sm="4">
            {
              this.state.simulatorSelect.find(s => s.missionSim === e.id)
              ? <select key={`station-${index}`} onChange={this._selectMissionStation.bind(this, e)} className="c-select form-control">
              <option value={null}>Select a station</option>
              {
                this.props.data.stations.map((stat) => {
                  return <option key={stat.id} value={stat.id}>{stat.name}</option>;
                })
              }
              </select>
              : 
              <div style={{
                width: '100%',
                height: '40px'
              }}/>
            }
            </Col>
            </Row>
            );
        })
        : 
        <div/>
      }
      </ModalBody>
      <ModalFooter>
      <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
      <Button color="primary" onClick={this.loadFlight.bind(this)}>Load Flight</Button>
      </ModalFooter>
      </Modal>
      );
  }
}

const MissionsData = gql `
query Missions {
  missions {
    id
    name
    simulators{
      id
      name
    }
  }
  simulators(template: true){
    id
    name
    template
    timeline {
      id
      name
      description
      order
      timelineItems {
        id
        name
        type
        event
        args
        delay
      }
    }
  }
  stations{
    id
    name
    stations {
      name
      cards {
        component
        icon
        name
      }
    }
  }
}`;

export default graphql(MissionsData, {})(withApollo(MissionModalView));

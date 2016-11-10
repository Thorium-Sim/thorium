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
import { graphql } from 'react-apollo';

class MissionModalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMission: {},
            simulatorSelect: {},
            stationSelect: {}
        };
    }
    selectMission(mission) {
        if (this.state.selectedMission.id === mission.id) {
            this.setState({selectedMission: undefined});
        } else {
            this.setState({selectedMission: mission});
        }
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
            <Row>
            {
          /*  this.state.selectedMission.id
            ? this.state.selectedMission.simulators.map((e, index) => {
                return (
                    <div>
                    <Col sm="6">
                    <select key={index} onChange={this._selectMissionSimulator.bind(this, index)} ref={`simulatorSelect-${index}`} className="c-select form-control">
                    <option value={null}>Select a simulator</option>
                    {this.props.data.simulators.map((sim) => {
                        return <option key={sim.id} value={sim.id}>{sim.name}</option>;
                    })}
                    </select>
                    </Col>
                    <Col sm="6">
                    {this.state.simulatorSelect[`simulator-${index}`]
                    ? <select key={`station-${index}`} onChange={this._selectMissionStation.bind(this, index)} className="c-select form-control">
                    <option value={null}>Select a station</option>
                    {this.props.data.stations.filter((stat) => {
                        return stat.simulatorId === this.state.simulatorSelect[`simulator-${index}`];
                    }).map((stat) => {
                        return <option key={stat.id} value={stat.id}>{stat.name}</option>;
                    })}
                    </select>
                    : <div style={{
                        width: '100%',
                        height: '40px'
                    }}/>
                }
                </Col>
                </div>
                );
            })
        : <div/>*/}
        </Row>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        <Button color="primary" onClick={this.props.loadFlight.bind(this)}>Load Flight</Button>
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
            name
        }
    }
}`;

export default graphql(MissionsData, {})(MissionModalView);

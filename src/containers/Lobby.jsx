import React, {Component} from 'react';
import {
    Row,
    Col,
    Container,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import Config from './Config.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import guid from '../helpers/guid.js';
import MissionModal from './MissionModal';
import DebugList from './DebugList';
import Core from './Core';
import './style.scss';
import Assets from '../components/views/AdminAssets'

const CLIENT_CHANGE_QUERY = gql`
subscription ClientChanged {
  clientChanged {
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
}
`;

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedMission: {},
            presences: {},
            simulatorSelect: {},
            stationSelect: {},
            activeTab: '3'
        };
        this.toggleTab = this.toggleTab.bind(this);
        this.toggle = this.toggle.bind(this);
        this.connectSub = null;
        this.subscription = null;
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            this.subscription = nextProps.data.subscribeToMore({
                document: CLIENT_CHANGE_QUERY,
                updateQuery: (previousResult, {subscriptionData}) => {
                    const returnResult = Object.assign({}, previousResult);
                    console.log('CLIENT CHANGE',subscriptionData.data.clientChanged)
                    returnResult.clients = subscriptionData.data.clientChanged;
                    return returnResult;
                },
            });
        }
    }
    loadFlight() {
        //Use the operation channel to insert the new flight into the database.
        let mission = this.props.data.missions.filter((e) => {
            if (e.id === this.state.selectedMission.id) {
                return true;
            }
            return false;
        })[0];
        mission.mission = {
            id: mission.id,
            name: mission.name
        };
        mission.timestamp = Date.now();
        delete mission.id;
        mission.id = guid();

        Object.keys(this.state.simulatorSelect).map((e) => {
            return this.state.simulatorSelect[e];
        }).forEach((e, index) => {
            mission.simulators[index].id = e;
        });

        Object.keys(this.state.stationSelect).map((e) => {
            return this.state.stationSelect[e];
        }).forEach((e, index) => {
            mission.simulators[index].stationSet = e;
        });

        /*let insertObj = {
            table: "flights",
            data: mission
        };*/ 

        this.setState({modal: false, selectedMission: {}});
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    _selectMissionSimulator(index, e) {
        let obj = this.state.simulatorSelect;
        obj[
        [`simulator-${index}`]
        ] = e.target.value;
        this.setState({simulatorSelect: obj});
    }
    _selectMissionStation(index, e) {
        let obj = this.state.stationSelect;
        obj[
        [`station-${index}`]
        ] = e.target.value;
        this.setState({stationSelect: obj});
    }
    _selectFlight(p, e) {
        let obj = this.state.presences || {};
        obj[p] = {
            flight: e.target.value,
            simulator: null,
            station: null
        };
        this.setState({presences: obj});
    }
    _selectSimulator(p, e) {
        let obj = this.state.presences || {};
        obj[p] = {
            flight: obj[p].flight,
            simulator: e.target.value,
            station: null
        };
        this.setState({presences: obj});
    }
    _selectStation(p, e) {
        let obj = this.state.presences || {};
        obj[p] = {
            flight: obj[p].flight,
            simulator: obj[p].simulator,
            station: e.target.value
        };
        this.setState({presences: obj});
    }
    render() {
        return (
            <Container className="lobby">
            <Row>
            <h2>Lobby</h2>
            <Nav tabs>
            <NavItem>
            <NavLink className={this.state.activeTab === '1' ? 'active' : ''} onClick={() => { this.toggleTab('1'); }} >
            Flights
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className={this.state.activeTab === '2' ? 'active' : ''} onClick={() => { this.toggleTab('2'); }} >
            Clients
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className={this.state.activeTab === '3' ? 'active' : ''} onClick={() => { this.toggleTab('3'); }} >
            Config
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className={this.state.activeTab === '4' ? 'active' : ''} onClick={() => { this.toggleTab('4'); }} >
            Debug
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className={this.state.activeTab === '5' ? 'active' : ''} onClick={() => { this.toggleTab('5'); }} >
            Core
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className={this.state.activeTab === '6' ? 'active' : ''} onClick={() => { this.toggleTab('6'); }} >
            Assets
            </NavLink>
            </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
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
                        {simulator.stationSet.stations.map((station) => {
                           return <Col key={`${simulator.id}-${station.name}`} sm="6">
                           <label>{station.name}</label>
                           <select>
                           <option value={null}>Select a client</option>
                           {this.props.data.clients.map((session) => {
                            return <option value={session.id}>{session.id}</option>
                        })}
                           </select>
                           </Col>;
                       })}
                       </Col>;
                   })}
                    </Row>;
                })
            }
            </TabPane>
            <TabPane tabId="2">
            <h4>Clients</h4>
            <table className="table table-striped table-hover table-sm">
            <thead>
            <tr>
            <th>Client Name</th>
            <th>Station</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {!this.props.data.loading
                ? this.props.data.clients.map((p, index) => (
                    <tr key={`flight-${p.id}-${index}`}>
                    <td>{`${p.id}`}</td>
                    <td>
                    <select onChange={this._selectStation.bind(this, p)} className="form-control-sm c-select">
                    <option>Select a station</option>
                    {(() => {
                        if (this.props.data.stations){
                            if (this.props.data.stations[0]){
                                return this.props.data.stations[0].stations.map((e, index) => {
                                    return <option key={`station-${p}-${e.name}-${index}`} value={e.name}>{e.name}</option>;
                                });
                            }
                        }
                        return <option disabled>No Stations</option>
                    })()}
                    </select>
                    </td>
                    <td>
                    <Button color="primary" title="This saves the current simulator and station setting and persists it for future flights." size="sm">Save</Button>
                    <Button color="danger" title="This removes the saved state." size="sm">Reset</Button>
                    </td>
                    </tr>
                    ))
                : <tr></tr>
            }
            </tbody>
            </table>
            </TabPane>
            <TabPane tabId="3">
            <Config />
            </TabPane>
            <TabPane tabId="4">
            <DebugList />
            </TabPane>
            <TabPane tabId="5">
            <Core />
            </TabPane>
            <TabPane tabId="6">
            <Assets />
            </TabPane>
            </TabContent>
            </Row>
            {
                this.state.modal ?
                <MissionModal
                modal={this.state.modal}
                toggle={this.toggle.bind(this)}
                loadFlight={this.loadFlight.bind(this)}
                />
                : <span />
            }
            </Container>
            );
}
}

const LobbyData = gql `
query Clients {
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
    flights {
        id
        name
        date
        simulators {
          id
          name
      }
  }
}`;

export default graphql(LobbyData, {
    options: () => {
        return {};
    },
})(Lobby);

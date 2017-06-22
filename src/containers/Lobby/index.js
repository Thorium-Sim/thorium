import React, {Component} from 'react';
import { Row, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import Config from '../Config';
import Clients from './Clients';
import Flights from './Flights';
import DebugList from '../DebugList';
import Core from '../Core';
import Assets from '../../components/views/AdminAssets'
import Configs from '../../components/config'
import IssueTracker from '../../components/admin/IssueTracker';
import './style.scss';

const {TempSimulatorConfig} = Configs;

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        const coreTab = localStorage.getItem('thorium_coreTab') || '1';
        this.state = {
            modal: false,
            activeTab: coreTab
        };
        this.toggleTab = this.toggleTab.bind(this);
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            localStorage.setItem('thorium_coreTab',tab);
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const Comps = {Flights: Flights, Clients: Clients, TempSimConfig: TempSimulatorConfig, Config: Config, DebugList: DebugList, Core: Core, Assets: Assets};
        return (
            <Container className="lobby">
            <Row>
            <h2>Lobby</h2>
            <Nav tabs>
            {
                Object.keys(Comps).map((Comp, index) => {
                    return (
                        <NavItem key={`nav-${index}`}>
                        <NavLink className={this.state.activeTab === `${index + 1}` ? 'active' : ''} onClick={() => { this.toggleTab(`${index + 1}`); }} >
                        {Comp}
                        </NavLink>
                        </NavItem>
                        )
                })
            }
            </Nav>
            </Row>
            <Row>
            <TabContent activeTab={this.state.activeTab}>
            {
                Object.keys(Comps).map((Comp, index) => {
                    const ThisComponent = Comps[Comp];
                    return (
                        <TabPane key={`tab-${index}`} tabId={`${index + 1}`}>
                        <ThisComponent />
                        </TabPane>
                        );
                })
            }
            </TabContent>
            </Row>
            <IssueTracker />
            </Container>
            );
    }
}

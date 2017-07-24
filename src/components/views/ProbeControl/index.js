import React, { Component } from 'react';
import gql from 'graphql-tag';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import './style.scss';

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      types {
        id
        name
      }
      probes {
        id
        type
        name
        query
        querying
        response
        equipment {
          id
          name
          count
        }
      }
    }
  }
`;

class ProbeControl extends Component {
  subscription = null;
  state = {
    selectedProbe: null
  };
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: { simulatorId: this.props.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ probes: subscriptionData.data.probesUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const { selectedProbe } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return (
      <Container fluid className="probe-control">
        <Row>
          <Col sm={3}>
            <h3>Probes</h3>
            <Card>
              <CardBlock>
                {probes.probes.map(p =>
                  <div
                    key={p.id}
                    onClick={() => this.setState({ selectedProbe: p.id })}
                    className={`probe-list ${selectedProbe === p.id
                      ? 'selected'
                      : ''}`}>
                    <p className="probe-name">
                      {p.name}
                    </p>
                    <small>
                      {probes.types.find(t => t.id === p.type).name}
                    </small>
                  </div>
                )}
              </CardBlock>
            </Card>
          </Col>
          <Col sm={9}>
            {selectedProbe && <ProbeControlWrapper />}
          </Col>
        </Row>
      </Container>
    );
  }
}

const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      types {
        id
        name
      }
      probes {
        id
        type
        name
        query
        querying
        response
        equipment {
          id
          name
          count
        }
      }
    }
  }
`;

export default graphql(PROBES_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ProbeControl));

class ProbeControlWrapper extends Component {
  state = { activeTab: '1' };
  toggle = tab => {
    if (this.state.activeTab === tab) return;
    this.setState({ activeTab: tab });
  };
  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                this.toggle('1');
              }}>
              Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                this.toggle('2');
              }}>
              Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card block>Something</Card>
              </Col>
              <Col sm="6">
                <Card block>something else</Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

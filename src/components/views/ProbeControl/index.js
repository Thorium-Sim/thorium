import React, { Component } from "react";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  Input,
  Button /*
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink*/
} from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";

import "./style.scss";

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
                      ? "selected"
                      : ""}`}
                  >
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
            {selectedProbe &&
              <ProbeControlWrapper
                {...probes.probes.find(p => p.id === selectedProbe)}
                probeId={probes.id}
                client={this.props.client}
              />}
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
  constructor(props) {
    super(props);
    this.state = { activeTab: "1", queryText: props.queryText };
  }
  toggle = tab => {
    if (this.state.activeTab === tab) return;
    this.setState({ activeTab: tab });
  };
  queryProbe = () => {
    const mutation = gql`
      mutation ProbeQuery($id: ID!, $probeId: ID!, $query: String!) {
        probeQuery(id: $id, probeId: $probeId, query: $query)
      }
    `;
    const variables = {
      id: this.props.probeId,
      probeId: this.props.id,
      query: this.state.queryText
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  cancelQuery = () => {
    const mutation = gql`
      mutation ProbeQuery($id: ID!, $probeId: ID!, $query: String!) {
        probeQuery(id: $id, probeId: $probeId, query: $query)
      }
    `;
    const variables = {
      id: this.props.probeId,
      probeId: this.props.id,
      query: ''
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { name, equipment, response, querying, client } = this.props;
    const { queryText } = this.state;
    //const { activeTab } = this.state;
    return (
      <Container>
        <h1>
          {name}
        </h1>
        <Row>
          <Col sm={4}>
            <h3>Equipment</h3>
            <Card className="equipment">
              <CardBlock>
                {equipment.map(e =>
                  <p key={e.id}>
                    {e.name}
                  </p>
                )}
              </CardBlock>
            </Card>
          </Col>
          <Col sm={8}>
            <h3>Query</h3>
            <Row>
              <Col sm={9}>
                {querying
                  ? <p className="querying">Querying...</p>
                  : <Input
                      size="lg"
                      type="text"
                      value={queryText}
                      onChange={evt =>
                        this.setState({ queryText: evt.target.value })}
                    />}
              </Col>
              <Col sm={3}>
                {querying
                  ? <Button size="lg" color="danger" onClick={this.cancelQuery}>
                      Cancel
                    </Button>
                  : <Button size="lg" color="primary" onClick={this.queryProbe}>
                      Query
                    </Button>}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <pre className="results">
                  {response}
                </pre>
              </Col>
            </Row>
          </Col>
        </Row>
        {/*<Nav tabs>
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
        </TabContent>*/}
      </Container>
    );
  }
}

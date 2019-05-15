import React, { Component } from "react";
import gql from "graphql-tag.macro";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  ListGroup,
  ListGroupItem /*
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink*/
} from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { withApollo, Query } from "react-apollo";
import Tour from "helpers/tourHelper";

import "./style.scss";

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "You can use this screen to control probes that have already been launched. Use the probe construction screen to launch a probe before controlling it here."
  },
  {
    selector: ".probe-list",
    content:
      "This is where the list of probes will show up. If you have a completed probe network, it will also show up in this list. Click on a probe to select it."
  },
  {
    selector: ".equipment",
    content: "This area shows the equipment on a selected probe."
  },
  {
    selector: ".query-box",
    content:
      "You can run probe queries, which are commands to be sent to the probe. These queries can activate equipment on the probe or perform scans or diagnostics."
  },
  {
    selector: ".results",
    content: "The results of your query will appear in this box"
  }
];

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
  render() {
    return (
      <Query
        query={PROBES_QUERY}
        variables={{ simulatorId: this.props.simulator.id }}
      >
        {({ data, loading, subscribeToMore }) => {
          if (loading || !data.probes) return null;
          const probes = data.probes[0];
          const { selectedProbe } = this.state;
          if (!probes) return <p>No Probe Launcher</p>;
          // Check to see if we have a probe network
          const network =
            probes.probes.filter(p => /[1-8]/.test(p.name)).length === 8;
          return (
            <Container fluid className="probe-control">
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: PROBES_SUB,
                    variables: { simulatorId: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        probes: subscriptionData.data.probesUpdate
                      });
                    }
                  })
                }
              />
              <Row>
                <Col
                  sm={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}
                >
                  <h3>Probes</h3>
                  <ListGroup style={{ flex: 1, overflowY: "auto" }}>
                    {network && (
                      <ListGroupItem
                        onClick={() =>
                          this.setState({
                            selectedProbe: probes.probes.filter(p =>
                              /[1-8]/.test(p.name)
                            )[0].id
                          })
                        }
                        active={
                          selectedProbe ===
                          probes.probes.filter(p => /[1-8]/.test(p.name))[0].id
                        }
                      >
                        <p className="probe-name">Probe Network</p>
                        <small />
                      </ListGroupItem>
                    )}
                    {probes.probes
                      .filter(p => !/^[1-8]{1}$/.test(p.name))
                      .map(p => (
                        <ListGroupItem
                          key={p.id}
                          onClick={() => this.setState({ selectedProbe: p.id })}
                          active={selectedProbe === p.id}
                        >
                          <p className="probe-name">{p.name}</p>
                          <small>
                            {probes.types.find(t => t.id === p.type).name}
                          </small>
                        </ListGroupItem>
                      ))}
                  </ListGroup>
                </Col>
                <Col sm={9}>
                  <ProbeControlWrapper
                    {...probes.probes.find(p => p.id === selectedProbe) || {}}
                    probeId={probes.id}
                    client={this.props.client}
                  />
                </Col>
              </Row>
              <Tour steps={trainingSteps} client={this.props.clientObj} />
            </Container>
          );
        }}
      </Query>
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

export default withApollo(ProbeControl);

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
    if (!this.state.queryText) return;
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
      mutation ProbeQuery($id: ID!, $probeId: ID!, $query: String) {
        probeQuery(id: $id, probeId: $probeId, query: $query)
      }
    `;
    const variables = {
      id: this.props.probeId,
      probeId: this.props.id,
      query: ""
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { name, equipment = [], response, querying, type } = this.props;
    const { queryText } = this.state;
    //const { activeTab } = this.state;
    return (
      <Container>
        <h1>{name}</h1>
        <Row>
          <Col sm={4}>
            <h3>Equipment</h3>
            <Card className="equipment">
              <CardBody>
                {equipment.map(e => (
                  <p key={e.id}>{e.name}</p>
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col sm={8}>
            <h3>Query</h3>
            <Row className="query-box">
              <Col sm={9}>
                {querying ? (
                  <p className="querying">Querying...</p>
                ) : (
                  <Input
                    disabled={!name}
                    size="lg"
                    type="text"
                    value={queryText}
                    onChange={evt =>
                      this.setState({ queryText: evt.target.value })
                    }
                  />
                )}
              </Col>
              <Col sm={3}>
                {querying ? (
                  <Button
                    disabled={!name}
                    size="lg"
                    color="danger"
                    onClick={this.cancelQuery}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    disabled={!name}
                    size="lg"
                    color="primary"
                    onClick={this.queryProbe}
                  >
                    Query
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <pre className="results">{response}</pre>
                {type && (
                  <img
                    alt="probe"
                    draggable={false}
                    style={{
                      width: "200px",
                      transform: "rotate(90deg) translate(-150px, -250px)"
                    }}
                    src={require(`../ProbeConstruction/probes/${type}.svg`)}
                  />
                )}
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

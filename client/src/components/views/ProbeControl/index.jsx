import React, {Component} from "react";
import gql from "graphql-tag";
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
  NavLink*/,
} from "helpers/reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {withApollo} from "@apollo/client/react/hoc";
import {Query} from "@apollo/client/react/components";
import {useMutation} from "@apollo/client";
import Tour from "helpers/tourHelper";

import "./style.scss";

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "You can use this screen to control probes that have already been launched. Use the probe construction screen to launch a probe before controlling it here.",
  },
  {
    selector: ".probe-list",
    content:
      "This is where the list of probes will show up. If you have a completed probe network, it will also show up in this list. Click on a probe to select it.",
  },
  {
    selector: ".equipment",
    content: "This area shows the equipment on a selected probe.",
  },
  {
    selector: ".query-box",
    content:
      "You can run probe queries, which are commands to be sent to the probe. These queries can activate equipment on the probe or perform scans or diagnostics.",
  },
  {
    selector: ".results",
    content: "The results of your query will appear in this box",
  },
];

export const PROBES_SUB = gql`
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
        launched
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
    selectedProbe: null,
  };
  render() {
    return (
      <Query
        query={PROBES_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({data, loading, subscribeToMore}) => {
          if (loading || !data) return null;
          const probes = data.probes[0];
          const {selectedProbe} = this.state;
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
                    variables: {simulatorId: this.props.simulator.id},
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        probes: subscriptionData.data.probesUpdate,
                      });
                    },
                  })
                }
              />
              <Row>
                <Col
                  sm={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <h3>Probes</h3>
                  <ListGroup style={{flex: 1, overflowY: "auto"}}>
                    {network && (
                      <ListGroupItem
                        onClick={() =>
                          this.setState({
                            selectedProbe: probes.probes.filter(p =>
                              /[1-8]/.test(p.name),
                            )[0].id,
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
                      .map(p => {
                        const probeType = probes.types.find(
                          t => t.id === p.type,
                        );
                        return (
                          <ListGroupItem
                            key={p.id}
                            onClick={() => this.setState({selectedProbe: p.id})}
                            active={selectedProbe === p.id}
                          >
                            <p className="probe-name">{p.name}</p>
                            <small>{probeType && probeType.name}</small>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </Col>
                <Col sm={9}>
                  <ProbeControlWrapper
                    key={selectedProbe}
                    {...(probes.probes.find(p => p.id === selectedProbe) || {})}
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

export const PROBES_QUERY = gql`
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
        launched
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

const ProbeControlWrapper = ({
  probeId,
  id,
  name,
  equipment = [],
  response,
  querying,
  type,
  query,
  launched,
}) => {
  // const [activeTab, setActiveTab] = React.useState("1");
  const [queryText, setQueryText] = React.useState(query);
  const [queryProbe] = useMutation(
    gql`
      mutation ProbeQuery($id: ID!, $probeId: ID!, $query: String!) {
        probeQuery(id: $id, probeId: $probeId, query: $query)
      }
    `,
    {
      variables: {
        id: probeId,
        probeId: id,
        query: queryText,
      },
    },
  );
  const [cancelQuery] = useMutation(
    gql`
      mutation ProbeQuery($id: ID!, $probeId: ID!, $query: String) {
        probeQuery(id: $id, probeId: $probeId, query: $query)
      }
    `,
    {
      variables: {
        id: probeId,
        probeId: id,
        query: "",
      },
    },
  );

  if (!id) return null;
  // const toggle = tab => {
  //   if (activeTab === tab) return;
  //  setActiveTab(tab);
  // };

  let probeImage = null;
  try {
    probeImage = require(`../ProbeConstruction/probes/${type}.svg`);
  } catch {
    //Nothing
  }
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
          {launched ? (
            <>
              <h3>Query</h3>
              <Row className="query-box">
                <Col sm={9}>
                  <Input
                    readOnly={querying}
                    disabled={!name}
                    size="lg"
                    type="text"
                    value={queryText}
                    onChange={evt => setQueryText(evt.target.value)}
                  />
                </Col>
                <Col sm={3}>
                  {querying ? (
                    <Button
                      disabled={!name}
                      size="lg"
                      color="danger"
                      onClick={cancelQuery}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      disabled={!name}
                      size="lg"
                      color="primary"
                      onClick={queryProbe}
                    >
                      Query
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <pre className="results">
                    {querying ? "Querying..." : response}
                  </pre>
                  {type && (
                    <img
                      alt="probe"
                      draggable={false}
                      style={{
                        width: "200px",
                        transform: "rotate(90deg) translate(-150px, -250px)",
                      }}
                      src={probeImage}
                    />
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <>
              <h3>Probe Not Launched</h3>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

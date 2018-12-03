import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Tour from "helpers/tourHelper";
import Exocomp from "./exocomp";
import ExocompConfig from "./exocompConfig";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const EXOCOMP_SUB = gql`
  subscription Exocomps($simulatorId: ID!) {
    exocompsUpdate(simulatorId: $simulatorId) {
      id
      state
      parts
      completion
      destination {
        id
        displayName
      }
      logs {
        timestamp
        message
      }
    }
  }
`;

const stardate = date => {
  var calculatedDate = new Date(date).getTime() / 1000 / 60 / 60 / 30 / 2;
  var subtraction = Math.floor(calculatedDate);
  var finalDate = (calculatedDate - subtraction) * 100000;
  return Math.floor(finalDate) / 10;
};

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Exocomps are small robots which can go through small corridors in the ship to repair damaged systems. Damage reports are one place where exocomp instructions might be given."
  },
  {
    selector: ".exocomp-information",
    content:
      "Information about exocomp activities appears in this box. Be sure to read it to make sure your exocomps are doing what they are supposed to do."
  },
  {
    selector: ".exocomp-list",
    content:
      "Your exocomps are listed here. Each of your exocomps can be assigned to different parts of the ship at the same time."
  },
  {
    selector: ".exocomp-list .btn",
    content: "Click this button to assign the exocomp to perform some work."
  },
  {
    selector: ".destination",
    content: "Choose the destination for your exocomp from this dropdown."
  },
  {
    selector: ".parts",
    content:
      "Exocomps use parts to perform their work. The parts assigned to this exocomp appear here."
  },
  {
    selector: ".parts-container",
    content: "Choose the part your exocomp needs from this list."
  },
  {
    selector: ".card-exocomps .btn-success",
    content: "Click this button to deploy the exocomp."
  },
  {
    selector: ".exocomp-box",
    content: "Watch this area to see what your exocomp is currently up to."
  }
];
class Exocomps extends Component {
  state = { selectedExocomp: null };
  deploy = (id, destination, parts) => {
    const mutation = gql`
      mutation DeployExocomp($exocomp: ExocompInput!) {
        deployExocomp(exocomp: $exocomp)
      }
    `;
    const variables = {
      exocomp: {
        destination,
        parts,
        id
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedExocomp: null
    });
  };
  recall = id => {
    const mutation = gql`
      mutation RecallExocomp($exocomp: ID!) {
        recallExocomp(exocomp: $exocomp)
      }
    `;
    const variables = {
      exocomp: id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      simulator,
      data: { exocomps, loading }
    } = this.props;
    if (loading || !exocomps) return null;
    const { selectedExocomp } = this.state;
    const exocomp = exocomps.find(e => e.id === selectedExocomp);
    const exocompNum = exocomps.findIndex(e => e.id === selectedExocomp) + 1;
    return (
      <Container className="card-exocomps">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: EXOCOMP_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  exocomps: subscriptionData.data.exocompsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={5}>
            <h2>Exocomps</h2>
            <div className="exocomp-list">
              {exocomps.map((e, i) => {
                return (
                  <Exocomp
                    {...e}
                    number={i + 1}
                    key={e.id}
                    select={ex => this.setState({ selectedExocomp: ex })}
                    recall={() => this.recall(e.id)}
                  />
                );
              })}
            </div>
          </Col>
          <Col sm={7}>
            {selectedExocomp ? (
              <ExocompConfig
                {...exocomp}
                simulatorId={simulator.id}
                cancel={() => this.setState({ selectedExocomp: null })}
                number={exocompNum}
                deploy={this.deploy}
              />
            ) : (
              <div>
                <h3>Information</h3>
                <Card className="exocomp-information">
                  <CardBody>
                    {exocomps
                      .reduce((prev, next, i) => {
                        return prev.concat(
                          next.logs.map(l =>
                            Object.assign({}, l, { number: i + 1 })
                          )
                        );
                      }, [])
                      .sort((a, b) => {
                        if (a.timestamp > b.timestamp) return -1;
                        if (a.timestamp < b.timestamp) return 1;
                        return 0;
                      })
                      .map((l, i) => (
                        <p key={`log-${l.timestamp}-${i}`}>
                          {stardate(l.timestamp)} - Exocomp #{l.number}:{" "}
                          {l.message}
                        </p>
                      ))}
                  </CardBody>
                </Card>
              </div>
            )}
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const QUERY = gql`
  query Exocomps($simulatorId: ID) {
    exocomps(simulatorId: $simulatorId) {
      id
      state
      parts
      completion
      logs {
        timestamp
        message
      }
      destination {
        id
        displayName
      }
    }
  }
`;
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Exocomps));

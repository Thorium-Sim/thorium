import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Row, Col, Button } from "reactstrap";

const SYSTEMS_SUB = gql`
  subscription DamagedSystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId) {
      id
      name
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
      }
      simulatorId
      type
    }
  }
`;

class ReactivationCore extends Component {
  constructor(props) {
    super(props);
    this.systemSub = null;
    this.state = {
      deck: null,
      room: null,
      selectedSystem: null,
      selectedReport: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.systemSub && this.systemSub();
  }
  reactivationCodeResponse = (response, id) => {
    const mutation = gql`
      mutation ReactivationCodeResponse($systemId: ID!, $response: Boolean!) {
        systemReactivationCodeResponse(systemId: $systemId, response: $response)
      }
    `;
    const variables = {
      systemId: id,
      response
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.systems) return null;
    const { systems } = this.props.data;
    return (
      <div>
        {systems &&
          systems.filter(s => s.damage.reactivationCode).map(s => (
            <div key={s.id}>
              <Row style={{ margin: 0 }}>{s.name}</Row>
              <Row style={{ margin: 0 }}>
                <Col sm={3}>Code:</Col>
                <Col sm={9}>{s.damage.reactivationCode}</Col>
              </Row>
              <Row style={{ margin: 0 }}>
                <Col sm={3}>Actual:</Col>
                <Col sm={9}>{s.damage.neededReactivationCode}</Col>
              </Row>
              <Row style={{ margin: 0 }}>
                <Col sm={8}>
                  <Button
                    onClick={() => {
                      this.reactivationCodeResponse(true, s.id);
                    }}
                    size={"sm"}
                    color="success"
                    block
                  >
                    Accept & Fix
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button
                    onClick={() => {
                      this.reactivationCodeResponse(false, s.id);
                    }}
                    size={"sm"}
                    color="danger"
                    block
                  >
                    Deny
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
      </div>
    );
  }
}
const SYSTEMS_QUERY = gql`
  query DamagedSystems($simulatorId: ID) {
    systems(simulatorId: $simulatorId) {
      id
      name
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
      }
      simulatorId
      type
    }
  }
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ReactivationCore));

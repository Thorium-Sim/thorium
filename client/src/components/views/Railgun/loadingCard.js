import React, { Component } from "react";
import { Query } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import Loader from "./loader";
import "./style.scss";

const queryData = `
id
displayName
damage {
  damaged
}
power {
  power
  powerLevels
}
ammo
maxAmmo
availableAmmo
`;

const QUERY = gql`
  query Railgun($simulatorId: ID!) {
    railgun(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription RailgunUpdate($simulatorId: ID!) {
    railgunUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class RailgunData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { railgun } = data;
          if (loading || !railgun) return null;
          if (!railgun[0]) return <div>No Railgun</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      railgun: subscriptionData.data.railgunUpdate
                    });
                  }
                })
              }
            >
              <Container>
                <Row>
                  <Col sm={7}>
                    <Loader {...this.props} {...railgun[0]} />
                  </Col>
                </Row>
              </Container>
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default RailgunData;

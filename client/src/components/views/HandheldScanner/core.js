import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ScannerCore from "./scannerCore";
import "./style.scss";

const fragment = gql`
  fragment ScannerData on Scanner {
    id
    scanRequest
    scanResults
    scanning
  }
`;

const QUERY = gql`
  query Scanner($simulatorId: ID!) {
    scanners(simulatorId: $simulatorId) {
      ...ScannerData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription ScannerUpdate($simulatorId: ID!) {
    scannersUpdate(simulatorId: $simulatorId) {
      ...ScannerData
    }
  }
  ${fragment}
`;

class ScannerData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { scanners } = data;
          if (loading || !scanners) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      scanners: subscriptionData.data.scannersUpdate
                    });
                  }
                })
              }
            >
              <ScannerCore {...this.props} scanners={scanners} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default ScannerData;

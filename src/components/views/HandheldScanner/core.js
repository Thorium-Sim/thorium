import { Query } from "@apollo/client";
import React from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ScannerCore from "./scannerCore";
import "./style.scss";

const fragment = gql`
  fragment ScannerData on Scanner {
    id
    label
    scanRequest
    scanResults
    scanning
  }
`;

export const HANDHELD_SCANNER_QUERY = gql`
  query Scanner($simulatorId: ID!) {
    scanners(simulatorId: $simulatorId) {
      ...ScannerData
    }
  }
  ${fragment}
`;
export const HANDHELD_SCANNER_SUBSCRIPTION = gql`
  subscription ScannerUpdate($simulatorId: ID!) {
    scannersUpdate(simulatorId: $simulatorId) {
      ...ScannerData
    }
  }
  ${fragment}
`;

const ScannerData = props => {
  const {simulator} = props;
  return (
    <Query
      query={HANDHELD_SCANNER_QUERY}
      variables={{simulatorId: simulator.id}}
    >
      {({loading, data, subscribeToMore}) => {
        if (loading || !data) return null;
        const {scanners} = data;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: HANDHELD_SCANNER_SUBSCRIPTION,
                variables: {simulatorId: simulator.id},
                updateQuery: (previousResult, {subscriptionData}) => {
                  return Object.assign({}, previousResult, {
                    scanners: subscriptionData.data.scannersUpdate,
                  });
                },
              })
            }
          >
            <ScannerCore {...props} scanners={scanners} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};
export default ScannerData;

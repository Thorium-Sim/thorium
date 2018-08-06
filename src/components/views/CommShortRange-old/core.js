import React, { Component } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import "./style.scss";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

const SHORTRANGE_SUB = gql`
  subscription ShortRangeCommSub($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      arrows {
        id
        signal
        frequency
        connected
        muted
      }
      signals {
        id
        name
        image
        color
        range {
          lower
          upper
        }
      }
      state
      frequency
      amplitude
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

const SHORTRANGE_QUERY = gql`
  query ShortRangeComm($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      arrows {
        id
        signal
        frequency
        connected
        muted
      }
      signals {
        id
        name
        image
        color
        range {
          lower
          upper
        }
      }
      state
      frequency
      amplitude
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));

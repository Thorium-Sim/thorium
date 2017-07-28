import React, { Component } from "react";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  Input,
  Button
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
      <Container fluid className="probe-control-core">

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
  render() {
    const { name, equipment, response, querying, client } = this.props;
    const { queryText } = this.state;
    return (
      <Container>

      </Container>
    );
  }
}

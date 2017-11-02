import React, { Component } from "react";
import { Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const TRACTORBEAM_SUB = gql`
  subscription TractorBeamUpdate($simulatorId: ID!) {
    tractorBeamUpdate(simulatorId: $simulatorId) {
      id
      state
      target
      strength
      stress
      scanning
    }
  }
`;

class TractorBeamCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stress: 0
    };
    this.tractorBeamSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.tractorBeamSub && !nextProps.data.loading) {
      this.tractorBeamSub = nextProps.data.subscribeToMore({
        document: TRACTORBEAM_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            tractorBeam: subscriptionData.tractorBeamUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      const tractorBeam = nextProps.data.tractorBeam[0];
      if (tractorBeam) {
        this.setState({
          stress: tractorBeam.stress
        });
      }
    }
  }
  componentWillUnmount() {
    this.tractorBeamSub && this.tractorBeamSub();
  }
  toggleTractor = (which, evt) => {
    const tractorBeam = this.props.data.tractorBeam[0];
    let mutation,
      variables = {
        id: tractorBeam.id,
        state: evt.target.checked
      };
    if (which === "target") {
      mutation = gql`
        mutation TractorBeamTarget($id: ID!, $state: Boolean!) {
          setTractorBeamTarget(id: $id, target: $state)
        }
      `;
    }
    if (which === "state") {
      mutation = gql`
        mutation TractorBeamState($id: ID!, $state: Boolean!) {
          setTractorBeamState(id: $id, state: $state)
        }
      `;
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setStress = evt => {
    this.setState({
      stress: evt.target.value
    });
  };
  updateStress = () => {
    const tractorBeam = this.props.data.tractorBeam[0];
    const mutation = gql`
      mutation TractorBeamStress($id: ID!, $stress: Float!) {
        setTractorBeamStress(id: $id, stress: $stress)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      stress: this.state.stress
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const tractorBeam = this.props.data.tractorBeam[0];
    if (!tractorBeam) return <p>No Tractor Beam</p>;
    return (
      <Container className="tractor-beam-core">
        <label style={{ color: tractorBeam.scanning ? "red" : "white" }}>
          Target:{" "}
          <input
            type="checkbox"
            onChange={evt => this.toggleTractor("target", evt)}
            checked={tractorBeam.target}
          />
        </label>
        <label>
          Active:{" "}
          <input
            type="checkbox"
            onChange={evt => this.toggleTractor("state", evt)}
            checked={tractorBeam.state}
          />
        </label>
        <label>Strength: {Math.round(tractorBeam.strength * 100)}</label>
        <label>
          Stress: {Math.round(this.state.stress * 100)}{" "}
          <input
            style={{ width: "50%", float: "right" }}
            onChange={this.setStress}
            onMouseUp={this.updateStress}
            value={this.state.stress}
            type="range"
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </Container>
    );
  }
}

const TRACTORBEAM_QUERY = gql`
  query TractorBeamInfo($simulatorId: ID!) {
    tractorBeam(simulatorId: $simulatorId) {
      id
      state
      target
      strength
      stress
      scanning
    }
  }
`;
export default graphql(TRACTORBEAM_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TractorBeamCore));

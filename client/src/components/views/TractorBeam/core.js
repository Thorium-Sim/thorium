import React, { Component } from "react";
import { Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { InputField, OutputField } from "../../generic/core";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const TRACTORBEAM_SUB = gql`
  subscription TractorBeamUpdate($simulatorId: ID!) {
    tractorBeamUpdate(simulatorId: $simulatorId) {
      id
      state
      target
      targetLabel
      strength
      stress
      scanning
    }
  }
`;

class TractorBeamCore extends Component {
  state = {
    stress: 0
  };

  targetLabel = label => {
    const tractorBeam = this.props.data.tractorBeam[0];
    const mutation = gql`
      mutation TractorBeamTargetLabel($id: ID!, $label: String!) {
        setTractorBeamTargetLabel(id: $id, label: $label)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      label
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggleTractor = (which, state) => {
    const tractorBeam = this.props.data.tractorBeam[0];
    let mutation;
    const variables = {
      id: tractorBeam.id,
      state
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
    if (this.props.data.loading || !this.props.data.tractorBeam) return null;
    const tractorBeam = this.props.data.tractorBeam[0];
    if (!tractorBeam) return <p>No Tractor Beam</p>;
    return (
      <Container className="tractor-beam-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TRACTORBEAM_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  tractorBeam: subscriptionData.data.tractorBeamUpdate
                });
              }
            })
          }
        />
        <OutputField
          alert={tractorBeam.state}
          onDoubleClick={() => this.toggleTractor("state", !tractorBeam.state)}
        >
          {tractorBeam.state ? "Active" : "Deactivated"}
        </OutputField>
        <label style={{ color: tractorBeam.scanning ? "red" : "white" }}>
          Target:{" "}
          <input
            type="checkbox"
            onChange={evt => this.toggleTractor("target", evt.target.checked)}
            checked={tractorBeam.target}
          />
        </label>

        <div>
          <span>Target Label:</span>
          <InputField
            prompt="What is the target label?"
            onClick={this.targetLabel}
          >
            {tractorBeam.targetLabel}
          </InputField>
        </div>
        <label>Strength: {Math.round(tractorBeam.strength * 100)}</label>
        <label>
          Stress: {Math.round(tractorBeam.stress * 100)}{" "}
          <input
            style={{ width: "50%", float: "right" }}
            onChange={this.setStress}
            onMouseUp={this.updateStress}
            defaultValue={tractorBeam.stress}
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
      targetLabel
      strength
      stress
      scanning
    }
  }
`;
export default graphql(TRACTORBEAM_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TractorBeamCore));

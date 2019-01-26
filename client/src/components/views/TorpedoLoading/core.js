import React, { Component } from "react";
import { Container, Button, ButtonGroup } from "reactstrap";
import gql from "graphql-tag";
import { OutputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import { titleCase } from "change-case";
import TorpedoInventory from "./inventory";
import "./style.scss";

const TORPEDO_SUB = gql`
  subscription TorpedosUpdate($simulatorId: ID!) {
    torpedosUpdate(simulatorId: $simulatorId) {
      id
      name
      loaded
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

class TorpedoLoadingCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "other"
    };
    this.subscription = null;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TORPEDO_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            torpedos: subscriptionData.data.torpedosUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      const torpedos =
        (nextProps.data.torpedos &&
          nextProps.data.torpedos.find(
            t => t.id === this.state.selectedTorpedo
          )) ||
        nextProps.data.torpedos[0];
      if (!torpedos) return;
      let { type } = this.state;
      const loadedTorp = torpedos.inventory.find(t => t.id === torpedos.loaded);
      if (loadedTorp) {
        type = loadedTorp.type;
      }
      this.setState({
        type
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  render() {
    if (this.props.data.loading) return null;
    const torpedos = this.props.data.torpedos;
    const { selectedTorpedo } = this.state;
    if (!torpedos || torpedos.length === 0) return <p>No torpedos</p>;
    const torpedo = torpedos.find(t => t.id === selectedTorpedo) || torpedos[0];

    return (
      <div>
        <Container fluid className="torpedos-core">
          <ButtonGroup>
            {torpedos.map((t, i) => (
              <Button
                size="sm"
                key={t.id}
                active={
                  t.id === selectedTorpedo || (!selectedTorpedo && i === 0)
                }
                onClick={() => this.setState({ selectedTorpedo: t.id })}
              >
                {t.name}
              </Button>
            ))}
          </ButtonGroup>
          <OutputField alert={torpedo.state === "fired"}>
            {(() => {
              if (torpedo.state === "idle") return "No Torpedos Loaded";

              return `${titleCase(this.state.type)} Torpedo ${
                torpedo.state === "loaded" ? "Loaded" : "Fired"
              }`;
            })()}
          </OutputField>
          <TorpedoInventory {...torpedo} />
        </Container>
      </div>
    );
  }
}

const TORPEDO_QUERY = gql`
  query Torpedos($simulatorId: ID!) {
    torpedos(simulatorId: $simulatorId) {
      id
      name
      loaded
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

export default graphql(TORPEDO_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TorpedoLoadingCore));

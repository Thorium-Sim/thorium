import React, { Component } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import gql from "graphql-tag";
import { OutputField, InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

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
  componentWillReceiveProps(nextProps) {
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
        nextProps.data.torpedos.find(
          t => t.id === this.state.selectedTorpedo
        ) || nextProps.data.torpedos[0];
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
  updateTorpedoCount(type, count) {
    if (count) {
      const torpedos =
        this.state.selectedTorpedo || this.props.data.torpedos[0];
      const mutation = gql`
        mutation AddWarhead($id: ID!, $type: String!, $count: Int!) {
          torpedoSetWarheadCount(id: $id, warheadType: $type, count: $count)
        }
      `;
      const variables = {
        id: torpedos.id || torpedos,
        type,
        count
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  }
  addTorpedo() {
    const type = prompt("What type of torpedo do you want to add?");
    if (type) {
      const torpedos =
        this.state.selectedTorpedo || this.props.data.torpedos[0];
      const mutation = gql`
        mutation AddWarhead($id: ID!, $type: String) {
          torpedoAddWarhead(id: $id, warhead: { type: $type })
        }
      `;
      const variables = {
        id: torpedos.id || torpedos,
        type
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const torpedos = this.props.data.torpedos;
    const { selectedTorpedo } = this.state;
    if (!torpedos || torpedos.length === 0) return <p>No torpedos</p>;
    const torpedo = torpedos.find(t => t.id === selectedTorpedo) || torpedos[0];
    const types = torpedo.inventory.reduce(
      (prev, next) => {
        if (prev[next.type]) {
          prev[next.type] += 1;
        } else {
          prev[next.type] = 1;
        }
        return prev;
      },
      { photon: 0, quantum: 0, probe: 0 }
    );
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
          <OutputField alert={torpedos.state === "fired"}>
            {(() => {
              if (torpedos.state === "idle") return "No Torpedos Loaded";

              return `${this.state.type} Torpedo ${
                torpedos.state === "loaded" ? "Loaded" : "Fired"
              }`;
            })()}
          </OutputField>
          <Row>
            <Col sm={6}>
              <Row style={{ margin: 0 }}>
                <Col sm={6}>Photon:</Col>
                <Col sm={6}>
                  <InputField
                    prompt="What is the new value for photon torpedos?"
                    onClick={this.updateTorpedoCount.bind(this, "photon")}
                  >
                    {types.photon}
                  </InputField>
                </Col>
                <Col sm={6}>Quantum:</Col>
                <Col sm={6}>
                  <InputField
                    prompt="What is the new value for quantum torpedos?"
                    onClick={this.updateTorpedoCount.bind(this, "quantum")}
                  >
                    {types.quantum}
                  </InputField>
                </Col>
                <Col sm={6}>Probe:</Col>
                <Col sm={6}>
                  <OutputField>{types.probe}</OutputField>
                </Col>
              </Row>
              <Button
                block
                size={"sm"}
                color={"info"}
                onClick={this.addTorpedo.bind(this)}
              >
                Add Torpedo
              </Button>
            </Col>
            <Col
              sm={6}
              style={{
                position: "relative",
                right: 0,
                height: "100%",
                overflowY: "scroll"
              }}
            >
              <p>Other</p>

              {Object.keys(types)
                .filter(t => ["photon", "quantum", "probe"].indexOf(t) < 0)
                .map(t => {
                  return (
                    <Row key={`torpedo-${t}`} style={{ margin: 0 }}>
                      <Col sm={6}>{t}:</Col>
                      <Col sm={6}>
                        <InputField
                          prompt={`What is the new value for ${t} torpedos?`}
                          onClick={this.updateTorpedoCount.bind(this, t)}
                        >
                          {types[t]}
                        </InputField>
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
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

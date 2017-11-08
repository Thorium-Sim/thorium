import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import Decompress from "./Decompress";
import Door from "./Door";
import { Clamps } from "../Docking/graphics";
import "./style.css";

const SHUTTLE_SUB = gql`
  subscription ShuttlesUpdate($simulatorId: ID) {
    dockingUpdate(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      compress
      doors
      image
      docked
      damage {
        damaged
      }
    }
  }
`;

class Shuttles extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: SHUTTLE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            docking: subscriptionData.dockingUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  render() {
    if (this.props.data.loading) return null;
    const { docking } = this.props.data;
    if (!docking) return null;
    return (
      <Container fluid className="shuttles-card">
        {
          <Row>
            {docking.map((d, i) => (
              <div className="shuttleBay" key={d.id}>
                <ShuttleBay
                  {...d}
                  i={i}
                  client={this.props.client}
                  simulatorId={this.props.simulator.id}
                />
              </div>
            ))}
          </Row>
        }
      </Container>
    );
  }
}

class ShuttleBay extends Component {
  state = { animating: null };
  toggleShuttle = (id, which) => {
    this.setState({ animating: which });
    const mutation = gql`
      mutation UpdateShuttleBay($port: DockingPortInput!) {
        updateDockingPort(port: $port)
      }
    `;
    const port = {
      id
    };
    port[which] = !this.props[which];
    this.props.client.mutate({
      mutation,
      variables: { port }
    });
    if (this.clearTimeoutId) clearTimeout(this.clearTimeoutId);
    this.clearTimeoutId = setTimeout(
      () => this.setState({ animating: null }),
      4000
    );
  };
  render() {
    const {
      docked,
      image,
      name,
      simulatorId,
      i,
      id,
      clamps,
      compress,
      doors
    } = this.props;
    const { animating } = this.state;
    return (
      <Card>
        <CardBody>
          <h3 className="text-center">{name}</h3>
          <Row>
            <Col sm={6}>
              <Button
                block
                disabled={!!animating}
                color="primary"
                onClick={() => this.toggleShuttle(id, "clamps")}
              >
                {clamps ? "Detach" : "Attach"} Clamps
              </Button>
              <Button
                block
                disabled={!!animating || !doors}
                color="primary"
                onClick={() => this.toggleShuttle(id, "compress")}
              >
                {compress ? "Decompress" : "Compress"} Bay
              </Button>
              <Button
                block
                disabled={!!animating || compress}
                color="primary"
                onClick={() => this.toggleShuttle(id, "doors")}
              >
                {doors ? "Open" : "Close"} Doors
              </Button>
            </Col>
            <Col sm={6}>
              {animating === "clamps" && <Clamps transform={clamps} />}
              {animating === "compress" && <Decompress on={compress} />}
              {animating === "doors" && (
                <Door open={!doors} number={"0" + (i + 1)} />
              )}
              {docked ? (
                <Asset asset={image} simulatorId={simulatorId}>
                  {({ src }) => (
                    <div
                      className="picture shuttle"
                      style={{
                        backgroundImage: `url('${src}')`,
                        display: !animating ? "flex" : "none"
                      }}
                    >
                      <div className="spacer" />
                    </div>
                  )}
                </Asset>
              ) : (
                <div
                  style={{ display: !animating ? "flex" : "none" }}
                  className="shuttle"
                >
                  <h2>No Shuttle</h2>
                  <div className="spacer" />
                </div>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const SHUTTLE_QUERY = gql`
  query Shuttles($simulatorId: ID) {
    docking(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      compress
      doors
      image
      docked
      damage {
        damaged
      }
    }
  }
`;
export default graphql(SHUTTLE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Shuttles));

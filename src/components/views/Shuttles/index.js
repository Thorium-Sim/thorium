import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import Tour from "reactour";
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

const trainingSteps = [
  {
    selector: ".shuttles-card",
    content:
      "Shuttles are small ships which can be stored inside of your ship. Most shuttles are piloted and can transport large amounts of supplies or personnel great distances."
  },
  {
    selector: ".clamps-button",
    content:
      "To undock a shuttle, you must first release the docking clamps which hold the shuttle in place with this button."
  },
  {
    selector: ".compress-button",
    content:
      "Then, you must decompress the shuttlebay. To board the shuttle, there must be air inside the shuttlebay. However, if the shuttlebay doors are opened without decompressing the shuttlebay, all of that air would be sucked into space. The change in pressure would also pull people and equipment into space as well, so decompressing the shuttlebay is an important safety step."
  },
  {
    selector: ".doors-button",
    content:
      "Finally, you can open the shuttlebay doors. Once the image of the shuttle disappears, you can know that the shuttle has disembarked from your ship."
  },
  {
    selector: ".nothing",
    content: "To dock a shuttle, follow the steps in the opposite order."
  }
];
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
    if (this.props.data.loading || !this.props.data.docking) return null;
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
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
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
                className="clamps-button"
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
                className="compress-button"
                onClick={() => this.toggleShuttle(id, "compress")}
              >
                {compress ? "Decompress" : "Compress"} Bay
              </Button>
              <Button
                block
                disabled={!!animating || compress}
                color="primary"
                className="doors-button"
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

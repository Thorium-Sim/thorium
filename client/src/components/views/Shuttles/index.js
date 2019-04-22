import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import Tour from "helpers/tourHelper";
import { Asset } from "helpers/assets";
import Decompress from "./Decompress";
import Door from "./Door";
import { Clamps } from "../Docking/graphics";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DamageOverlay from "../helpers/DamageOverlay";
import FontAwesome from "react-fontawesome";

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
      direction
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
    selector: ".departure-button",
    content:
      'To use a shuttle, first click "Prepare for departure" to begin the departure sequence.'
  },
  {
    selector: ".clamps-button",
    content:
      "You must then release the docking clamps which hold the shuttle in place. This button shows whether the clamps are attached or detached."
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
  render() {
    if (this.props.data.loading || !this.props.data.docking) return null;
    const { docking } = this.props.data;
    if (!docking) return null;
    return (
      <Container fluid className="shuttles-card">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SHUTTLE_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  docking: subscriptionData.data.dockingUpdate
                });
              }
            })
          }
        />
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
        <Tour steps={trainingSteps} client={this.props.clientObj} />
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
  updateShuttle = (id, which, value) => {
    const mutation = gql`
      mutation UpdateShuttleBay($port: DockingPortInput!) {
        updateDockingPort(port: $port)
      }
    `;
    const port = {
      id
    };
    port[which] = value;
    this.props.client.mutate({
      mutation,
      variables: { port }
    });
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
      doors,
      damage,
      direction
    } = this.props;
    const { animating } = this.state;

    let hint = { clamps: "", compress: "", doors: "" };

    let shuttleStatusMsg = "";
    if (direction === "departing" && docked) {
      shuttleStatusMsg = "Preparing shuttle for departure.";

      if (!clamps) hint.clamps = "ok";
      if (!compress) hint.compress = "ok";
      if (!doors) hint.doors = "ok";

      if (clamps) hint.clamps = "attention";
      else if (compress) hint.compress = "attention";
      else if (doors) hint.doors = "attention";
      else shuttleStatusMsg = "Shuttle is departing.";
    } else if (direction === "departing" && !docked) {
      shuttleStatusMsg = "Shuttle has departed. Secure shuttle bay.";

      if (!clamps) hint.clamps = "ok";
      if (compress) hint.compress = "ok";
      if (doors) hint.doors = "ok";

      if (!doors) hint.doors = "attention";
      else if (!compress) hint.compress = "attention";
      else shuttleStatusMsg = "Shuttle bay secured.";
    } else if (direction === "arriving" && !docked) {
      shuttleStatusMsg = "Shuttle approaching. Prepare for arrival.";

      if (!clamps) hint.clamps = "ok";
      if (!compress) hint.compress = "ok";
      if (!doors) hint.doors = "ok";

      if (clamps) hint.clamps = "attention";
      else if (compress) hint.compress = "attention";
      else if (doors) hint.doors = "attention";
      else shuttleStatusMsg = "The shuttle is entering the bay. Please wait.";
    } else if (direction === "arriving" && docked) {
      shuttleStatusMsg = "Shuttle has arrived. Please secure shuttle.";

      if (clamps) hint.clamps = "ok";
      if (compress) hint.compress = "ok";
      if (doors) hint.doors = "ok";

      if (!doors) hint.doors = "attention";
      else if (!compress) hint.compress = "attention";
      else if (!clamps) hint.clamps = "attention";
      else shuttleStatusMsg = "Shuttle secured.";
    } else if (!docked) {
      if (!clamps) hint.clamps = "ok";
      if (compress) hint.compress = "ok";
      if (doors) hint.doors = "ok";
    } else if (docked) {
      if (clamps) hint.clamps = "ok";
      if (compress) hint.compress = "ok";
      if (doors) hint.doors = "ok";
    }

    var hintStrings = {
      ok: <FontAwesome name="check" />,
      attention: <FontAwesome name="arrow-right" />
    };

    return (
      <Card>
        <DamageOverlay system={{ damage }} message={`${name} Offline`} />
        <CardBody>
          <h3 className="text-center">{name}</h3>

          <Row>
            <Col sm={7}>
              {direction === "unspecified" && docked && (
                <Button
                  block
                  className="departure-button"
                  color="success"
                  onClick={() =>
                    this.updateShuttle(id, "direction", "departing")
                  }
                >
                  Prepare for departure
                </Button>
              )}
              {direction === "departing" && docked && (
                <Button
                  block
                  className="departure-button"
                  color="danger"
                  onClick={() =>
                    this.updateShuttle(id, "direction", "unspecified")
                  }
                >
                  Abort departure sequence
                </Button>
              )}
              <div className="docking-icon-wrapper">
                <div className={`docking-icon ${hint.clamps}`}>
                  {hintStrings[hint.clamps]}
                </div>
                <Button
                  block
                  className="clamps-button"
                  disabled={!!animating || !docked}
                  color="primary"
                  onClick={() => this.toggleShuttle(id, "clamps")}
                >
                  Clamps {clamps ? "attached" : "detached"}
                </Button>
              </div>
              <div className="docking-icon-wrapper">
                <div className={`docking-icon ${hint.compress}`}>
                  {hintStrings[hint.compress]}
                </div>
                <Button
                  block
                  disabled={!!animating || !doors}
                  color="primary"
                  className="compress-button"
                  onClick={() => this.toggleShuttle(id, "compress")}
                >
                  {compress ? "Compressed" : "Decompressed"}
                </Button>
              </div>
              <div className="docking-icon-wrapper">
                <div className={`docking-icon ${hint.doors}`}>
                  {hintStrings[hint.doors]}
                </div>
                <Button
                  block
                  disabled={!!animating || compress}
                  color="primary"
                  className="doors-button"
                  onClick={() => this.toggleShuttle(id, "doors")}
                >
                  Doors {doors ? "closed" : "open"}
                </Button>
              </div>
              <div className="docking-status-message">{shuttleStatusMsg}</div>
            </Col>
            <Col sm={5}>
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
                  <h2>Shuttlebay Empty</h2>
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
      direction
    }
  }
`;
export default graphql(SHUTTLE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Shuttles));

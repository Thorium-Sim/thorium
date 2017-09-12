import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBlock, Button } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import Decompress from "./Decompress";
import Door from "./Door";
import { Clamps } from "../Docking/graphics";
import "./style.scss";

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
            docking: subscriptionData.data.dockingUpdate
          });
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const { docking } = this.props.data;
    return (
      <Container fluid className="shuttles-card">
        {
          <Row>
            {docking.map((d, i) =>
              <Col sm={4} key={d.id}>
                <ShuttleBay
                  {...d}
                  i={i}
                  simulatorId={this.props.simulator.id}
                />
              </Col>
            )}
            {docking.map(
              (d, i) =>
                i < 2 &&
                <Col sm={4} key={d.id}>
                  <ShuttleBay
                    {...d}
                    i={i}
                    simulatorId={this.props.simulator.id}
                  />
                </Col>
            )}
          </Row>
        }
      </Container>
    );
  }
}

class ShuttleBay extends Component {
  state = { animating: null };
  componentWillUpdate(newProps) {
    // Check to see if there is a change in any of the props
  }
  toggleShuttle = (id, which) => {
    this.setState({ animating: which });
    if (this.clearTimeoutId) clearTimeout(this.clearTimeoutId);
    this.clearTimeoutId = setTimeout(
      () => this.setState({ animating: null }),
      5000
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
        <CardBlock>
          <h3 className="text-center">
            {name}
          </h3>
          <Row>
            <Col sm={6}>
              <Button
                block
                disabled={!!animating}
                color="primary"
                onClick={() => this.toggleShuttle(id, "clamps")}
              >
                Detach Clamps
              </Button>
              <Button
                block
                disabled={!!animating}
                color="primary"
                onClick={() => this.toggleShuttle(id, "compress")}
              >
                Decompress Bay
              </Button>
              <Button
                block
                disabled={!!animating}
                color="primary"
                onClick={() => this.toggleShuttle(id, "doors")}
              >
                Open Doors
              </Button>
            </Col>
            <Col sm={6}>
              {animating === "clamps" && <Clamps transform={clamps} />}
              {animating === "compress" && <Decompress on={compress} />}
              {animating === "doors" &&
                <Door open={!doors} number={"0" + (i + 1)} />}
              {docked &&
                <Asset asset={image} simulatorId={simulatorId}>
                  {({ src }) =>
                    <div
                      className="picture shuttle"
                      style={{
                        backgroundImage: `url('${src}')`,
                        display: !animating ? "flex" : "none"
                      }}
                    >
                      <div className="spacer" />
                    </div>}
                </Asset>}
            </Col>
          </Row>
        </CardBlock>
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

import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
const ShipImage = ({ simulatorId, view, clients, charge, index }) => {
  return (
    <div className="ship-image">
      <Asset asset={view} simulatorId={simulatorId}>
        {({ src }) => (
          <Fragment>
            <div
              alt="Ship Top"
              style={{
                backgroundImage: `url('${src}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "40vh",
                objectFit: "contain"
              }}
            />
            <div
              className="power-bars"
              style={{
                WebkitMaskImage: `url('${src}')`
              }}
            >
              {clients.map((c, i) => (
                <div
                  style={{
                    width: `${(1 / clients.length) * 100}%`,
                    left: `${((i * 1) / clients.length) * 100}%`,

                    opacity: index === i ? charge : 0
                  }}
                />
              ))}
            </div>
          </Fragment>
        )}
      </Asset>
    </div>
  );
};
class Thx extends Component {
  constructor(props) {
    super(props);
    const {
      clients,
      clientObj: { id: clientId }
    } = this.props;
    const client = clients.find(c => c.id === clientId) || {
      id: clientId,
      charge: 0,
      lock: false
    };
    this.state = {
      charge: client.charge
    };
  }
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    this.frame = true;
    this.timeout = true;
    this.loop();
    this.update();
  };
  update = () => {
    if (this.timeout) {
      this.timeout = setTimeout(this.update, 1000);
      const {
        id,
        clientObj: { id: clientId }
      } = this.props;
      const { charge } = this.state;
      this.props.client.mutate({
        mutation: gql`
          mutation ChargeTHX($id: ID!, $clientId: ID!, $charge: Float!) {
            chargeThx(id: $id, clientId: $clientId, charge: $charge)
          }
        `,
        variables: {
          id,
          clientId,
          charge
        }
      });
    }
  };
  loop = () => {
    if (this.frame) {
      this.frame = requestAnimationFrame(this.loop);
      this.setState(({ charge }) => {
        return { charge: Math.min(1, charge + 1 / 1000) };
      });
    }
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timeout);
    this.timeout = null;
    this.frame = null;
  };
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.mouseUp);
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timeout);
    this.timeout = null;
    this.frame = null;
  }
  render() {
    const {
      clients,
      clientObj: { id: clientId },
      simulator: { id: simulatorId }
    } = this.props;
    const { charge } = this.state;
    const { lock } = clients.find(c => c.id === clientId) || { lock: false };
    const index = clients.findIndex(c => c.id === clientId);
    return (
      <Container className="card-thx">
        <Row>
          <Col sm={8}>
            <ShipImage
              view="/Ship Views/Top"
              simulatorId={simulatorId}
              clients={clients}
              index={index}
              charge={charge}
            />
            <ShipImage
              view="/Ship Views/Right"
              simulatorId={simulatorId}
              clients={clients}
              index={index}
              charge={charge}
            />
          </Col>
          <Col
            sm={{ size: 3, offset: 1 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2 className="text-center">Sector Charge</h2>
            <div className="thx-bar-container">
              <div
                className="thx-bar"
                style={{ height: `${100 - charge * 100}%` }}
              />
            </div>
            <Button
              color="warning"
              block
              size="lg"
              disabled={charge === 1}
              onMouseDown={this.mouseDown}
            >
              Charge
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <Button block size="lg" color="danger" disabled={charge !== 1}>
              Lock Sector {index + 1}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default withApollo(Thx);

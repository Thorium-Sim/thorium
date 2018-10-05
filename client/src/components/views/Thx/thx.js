import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Asset } from "helpers/assets";
import { withApollo, Mutation } from "react-apollo";

import gql from "graphql-tag";
const ShipImage = ({
  simulatorId,
  view,
  clients,
  charge,
  index,
  executive
}) => {
  const clientList = clients.filter(c => !c.executive);
  return (
    <div className="ship-image">
      <Asset asset={view}>
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
              {clientList.map((c, i) => (
                <div
                  key={`client-${c.id}`}
                  style={{
                    width: `${(1 / clientList.length) * 100}%`,
                    left: `${((i * 1) / clientList.length) * 100}%`,
                    backgroundColor: c.lock
                      ? "rgba(255,0,0,0.5)"
                      : "rgba(255,255,0,0.5)",
                    opacity: executive ? c.charge : index === i ? charge : 0
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
class ThxRender extends Component {
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
  componentDidMount() {
    if (this.props.charging && !this.frame) {
      this.mouseDown();
    }
  }
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
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    this.frame = true;
    this.timeout = true;
    this.loop();
    this.update(this.state.charge);
    this.props.setCharging(true);
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
    this.props.setCharging(false);
    document.removeEventListener("mouseup", this.mouseUp);
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timeout);
    this.timeout = null;
    this.frame = null;
    this.update();
  };
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.mouseUp);
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timeout);
    this.timeout = null;
    this.frame = null;
    this.update();
  }
  render() {
    const {
      id,
      clients,
      clientObj: { id: clientId },
      simulator: { id: simulatorId, assets },
      station: { executive },
      name,
      activated
    } = this.props;
    const { charge } = this.state;
    const clientList = clients.filter(c => !c.executive);
    const index = clientList.findIndex(c => c.id === clientId);
    return (
      <Container className="card-thx">
        <Row>
          <Col sm={{ size: 8, offset: executive ? 2 : 0 }}>
            <ShipImage
              view={assets.top}
              simulatorId={simulatorId}
              clients={clients}
              index={index}
              charge={charge}
              executive={executive}
            />
            <ShipImage
              view={assets.side}
              simulatorId={simulatorId}
              clients={clients}
              index={index}
              charge={charge}
              executive={executive}
            />
          </Col>
          {!executive && (
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
          )}
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            {executive ? (
              <Mutation
                mutation={gql`
                  mutation ActivateTHX($id: ID!) {
                    activateThx(id: $id)
                  }
                `}
                variables={{ id }}
              >
                {activate => (
                  <Mutation
                    mutation={gql`
                      mutation ActivateTHX($id: ID!) {
                        deactivateThx(id: $id)
                      }
                    `}
                    variables={{ id }}
                  >
                    {deactivate => (
                      <Button
                        block
                        size="lg"
                        color="danger"
                        disabled={clientList.filter(c => c.lock).length === 0}
                        onClick={activated ? deactivate : activate}
                      >
                        {activated ? "Deactivate" : "Activate"} {name}
                      </Button>
                    )}
                  </Mutation>
                )}
              </Mutation>
            ) : (
              <Mutation
                mutation={gql`
                  mutation LockTHX($id: ID!, $clientId: ID!) {
                    lockThx(id: $id, clientId: $clientId)
                  }
                `}
                variables={{ clientId, id }}
              >
                {action => (
                  <Button
                    block
                    size="lg"
                    color="danger"
                    disabled={charge !== 1}
                    onClick={action}
                  >
                    Lock Sector {index + 1}
                  </Button>
                )}
              </Mutation>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

class Thx extends Component {
  state = {};

  render() {
    const {
      name,
      clients,
      clientObj: { id: clientId }
    } = this.props;
    const { charging } = this.state;
    const { lock, charge } = clients.find(c => c.id === clientId) || {
      lock: false,
      charge: 0
    };
    const index = clients.findIndex(c => c.id === clientId);

    return lock ? (
      <div className="thx-lock">
        {name} locked for sector {index + 1}
      </div>
    ) : (
      <ThxRender
        {...this.props}
        charging={charging}
        key={charge}
        setCharging={c => this.setState({ charging: c })}
        charge={charge}
        mouseDown={this.mouseDown}
      />
    );
  }
}
export default withApollo(Thx);

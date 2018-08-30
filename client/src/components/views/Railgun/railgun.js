import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { FormattedMessage } from "react-intl";
import { Container, Row, Col } from "reactstrap";
import SensorGrid from "../Sensors/GridDom/grid";
import { throttle } from "../../../helpers/debounce";
import RailgunLoader from "./loader";
import Tour from "../../../helpers/tourHelper";

function distance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}

class Railgun extends Component {
  constructor(props) {
    super(props);
    this.triggerFire = throttle(this.triggerFire, 300);
  }
  static trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <FormattedMessage
          id="railgun-training-1"
          defaultMessage="The railgun is a point-defense weapon designed to destroy incoming projectiles. You can use it to defend your ship from attackers."
        />
      )
    },
    {
      selector: ".sensors-holder",
      content: (
        <FormattedMessage
          id="railgun-training-2"
          defaultMessage="This basic sensors grid shows the location of any incoming projectiles relative to this ship, shown at the center of the grid."
        />
      )
    },
    {
      selector: ".sensors-holder",
      content: (
        <FormattedMessage
          id="railgun-training-3"
          defaultMessage="To fire the railgun, click with your mouse on the sensor grid. A red dot will indicate where the railgun bolt will hit. You must fire very close to an incoming projectile for the bolt to hit its target."
        />
      )
    },
    {
      selector: ".sensors-holder",
      content: (
        <FormattedMessage
          id="railgun-training-4"
          defaultMessage="Once an incoming projectile has been destroyed, you will see it explode and disappear."
        />
      )
    },
    {
      selector: ".railgun-controls",
      content: (
        <FormattedMessage
          id="railgun-loader-training-2"
          defaultMessage="Here you can see the number of bolts loaded. Make sure you don't run out of railgun bolts!"
        />
      )
    }
  ];
  state = { ammo: 25 };
  locations = {};
  triggerFire = () => {
    const { id, simulator, ammo } = this.props;
    if (!ammo) return;
    const mutation = gql`
      mutation FireRailgun($id: ID!, $simulatorId: ID!, $contactId: ID) {
        fireRailgun(id: $id, simulatorId: $simulatorId, contactId: $contactId)
      }
    `;
    const variables = {
      id,
      simulatorId: simulator.id,
      contactId: this.currentContact
    };
    this.props.client.mutate({ mutation, variables });
    clearTimeout(this.mouseTimeout);
    this.setState(state => ({
      mouse: this.mouse
    }));
    this.mouseTimeout = setTimeout(() => {
      this.setState({ mouse: null });
    }, 300);
  };
  mouseDown = e => {
    this.mouseMove(e);
    this.loop();
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    clearTimeout(this.looping);
    this.currentContact = null;
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  };
  mouseMove = e => {
    const locations = this.locations;
    const { left, top, width } = ReactDOM.findDOMNode(this)
      .querySelector(".sensors-holder")
      .getBoundingClientRect();
    const location = {
      x: ((e.clientX - left - width / 2) / width) * 2,
      y: ((e.clientY - top - width / 2) / width) * 2
    };
    const distances = Object.values(locations)
      .filter(
        l =>
          !l.destroyed &&
          distance(l.position.x, l.position.y, location.x, location.y) <= 0.05
      )
      .map(l => l.id);
    this.currentContact = distances[0];
    this.mouse = {
      x: e.clientX - 5,
      y: e.clientY - 5
    };
  };
  loop = () => {
    this.looping = setTimeout(this.loop, 300);
    this.triggerFire();
  };
  render() {
    const { mouse } = this.state;
    const { contacts, simulator, damage, power } = this.props;
    const hasLoader = simulator.stations.find(s =>
      s.cards.find(c => c.component === "RailgunLoading")
    );
    const damaged =
      (power && power.powerLevels && power.power < power.powerLevels[0]) ||
      (damage && damage.damaged);
    return (
      <Container fluid className="card-railgun">
        {mouse && (
          <div
            className="pointer"
            style={{
              transform: `translate(${mouse.x}px, ${mouse.y}px)`
            }}
          />
        )}
        <Row>
          <Col sm={6}>
            <SensorGrid
              renderLines={() => (
                <svg
                  viewBox="0 0 8 8"
                  style={{ width: "30px", position: "absolute" }}
                >
                  <path
                    d="M7.68,3.84c-2.119,0 -3.84,-1.721 -3.84,-3.84c0,2.119 -1.721,3.84 -3.84,3.84c2.119,0 3.84,1.721 3.84,3.84c0,-2.119 1.721,-3.84 3.84,-3.84Z"
                    fill="#ebebeb"
                  />
                </svg>
              )}
              contacts={contacts}
              gridMouseDown={damaged ? () => {} : this.mouseDown}
              // Don't set state - we don't need a re-render
              locationChange={locations => (this.locations = locations)}
            />
          </Col>
          <Col sm={6}>
            <RailgunLoader {...this.props} mainScreen hasLoader={hasLoader} />
          </Col>
        </Row>
        <Tour
          steps={Railgun.trainingSteps.concat(
            !hasLoader ? RailgunLoader.trainingSteps : []
          )}
          client={this.props.clientObj}
        />
      </Container>
    );
  }
}
export default withApollo(Railgun);

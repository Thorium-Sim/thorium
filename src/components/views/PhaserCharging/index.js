import React, { Component } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Tour from "../../../helpers/tourHelper";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

//import DamageOverlay from '../helpers/DamageOverlay';
import "./style.scss";
export { default as PhaserFire } from "./phaserFire";

const PHASERS_SUB = gql`
  subscription PhasersUpdate($simulatorId: ID!) {
    phasersUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      beams {
        id
        state
        charge
        heat
      }
      arc
    }
  }
`;

const trainingSteps = [
  {
    selector: ".card-phaserCharging",
    content:
      "Phasers are energy weapons which must be charged before they can be fired. Use this screen to charge them."
  },
  {
    selector: ".phaserBeam",
    content:
      "Click the phaser button on the left to select that phaser. You can also see the phaser's charge here."
  },
  {
    selector: ".phaserButtons",
    content:
      "Click on these buttons to charge and discharge an individual phaser beam or all of the phaser beams at once."
  },
  {
    selector: ".phaserArc",
    content:
      "You can control the phaser arc here. A wide phaser arc will be more accurate, but will cause less damage because the phaser beam is spread out. A narrow phaser arc will do higher, more precise damage but a fast moving ship could avoid the beam. Use an arc that is appropriate for a specific situation."
  }
];
class PhaserCharging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBank: null,
      arc: 0.5
    };
  }
  selectPhaserBank(id) {
    this.setState({
      selectedBank: id
    });
  }
  chargePhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation ChargePhaserBeam($id: ID!, $beamId: ID!) {
        chargePhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  dischargePhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation DischargePhaserBeam($id: ID!, $beamId: ID!) {
        dischargePhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  chargeAll() {
    let i = 0;
    const phasers = this.props.data.phasers[0];
    phasers.beams.forEach(b => {
      if (b.charge < 1) {
        setTimeout(this.chargePhasers.bind(this, b.id), i * 500);
        i += 1;
      }
    });
  }
  dischargeAll() {
    const phasers = this.props.data.phasers[0];
    phasers.beams.forEach(b => {
      if (b.charge > 0) {
        this.dischargePhasers(b.id);
      }
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.phasers) return null;
    const phasers = this.props.data.phasers && this.props.data.phasers[0];
    const { selectedBank } = this.state;
    if (!phasers) return <p>No Phaser System</p>;
    return (
      <Container fluid className="card-phaserCharging">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: PHASERS_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  phasers: subscriptionData.data.phasersUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm="2">
            <p>Phaser Banks</p>
          </Col>
          <Col sm="10" className="phaserLevels">
            <p>0%</p>
            <p>25%</p>
            <p>50%</p>
            <p>
              <span>75%</span>
              <span>100%</span>
            </p>
          </Col>
        </Row>
        {phasers.beams.map((p, i) => (
          <PhaserBeam
            key={p.id}
            {...p}
            index={i + 1}
            selectedBank={selectedBank}
            selectPhaserBank={this.selectPhaserBank.bind(this, p.id)}
          />
        ))}
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Row className="phaserButtons">
              <Col sm={6}>
                <Button
                  color="primary"
                  disabled={!selectedBank}
                  block
                  onClick={this.dischargePhasers.bind(this, selectedBank)}
                >
                  Discharge Phaser Bank
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  color="primary"
                  disabled={!selectedBank}
                  block
                  onClick={this.chargePhasers.bind(this, selectedBank)}
                >
                  Charge Phaser Bank
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  color="primary"
                  onClick={this.dischargeAll.bind(this)}
                  block
                >
                  Discharge All Phaser Banks
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  color="primary"
                  onClick={this.chargeAll.bind(this)}
                  block
                >
                  Charge All Phaser Banks
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <PhaserArc
          client={this.props.client}
          phaserId={phasers.id}
          arc={phasers.arc}
        /> */}
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

export const PhaserBeam = ({
  chargePhasers,
  dischargePhasers,
  coolPhasers,
  firePhasers,
  heat,
  targeting,
  index,
  id,
  charge,
  state,
  selectedBank = null,
  disabled,
  selectPhaserBank = () => {}
}) => {
  if (targeting) {
    return (
      <div>
        <Row className="phaserBeam">
          <Col sm="8">
            <div className="phaserText">
              <p>Phaser Bank {index}</p>
              <p>Charge: {Math.round(charge * 100)}%</p>
            </div>
            <div className="chargeHolder">
              <div className="charge" style={{ width: `${charge * 100}%` }} />
            </div>
          </Col>
          <Col sm={"4"} style={{ marginTop: "27px" }}>
            <Button
              block
              color="danger"
              disabled={disabled}
              onMouseDown={e => firePhasers(id, e)}
            >
              Fire Phasers
            </Button>
          </Col>
        </Row>
        <Row className="phaserBeam">
          <Col sm="8">
            <div className="chargeHolder">
              <div className="heat" style={{ width: `${heat * 100}%` }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="4" xl="3">
            <Button
              block
              color="primary"
              onClick={chargePhasers.bind(this, id)}
            >
              Charge
            </Button>
          </Col>
          <Col lg="4" xl="3">
            <Button
              block
              color="warning"
              onClick={dischargePhasers.bind(this, id)}
            >
              Discharge
            </Button>
          </Col>
          <Col lg="4" xl="3">
            <Button block color="info" onMouseDown={coolPhasers.bind(this, id)}>
              Coolant
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <Row className="phaserBeam">
      <Col sm="2">
        <Button
          color="warning"
          active={id === selectedBank}
          onClick={selectPhaserBank}
          block
        >
          Phaser Bank {index}
        </Button>
      </Col>
      <Col sm="10">
        <div className="chargeHolder">
          <div className="charge" style={{ width: `${charge * 100}%` }} />
        </div>
      </Col>
    </Row>
  );
};

export class PhaserArc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arc: props.arc
    };
    this.mouseUp = () => {
      document.removeEventListener("mouseup", this.mouseUp);
      this.arcTimeout = null;
    };
    this.arcTimeout = null;
  }
  setArc() {
    const { phaserId } = this.props;
    const mutation = gql`
      mutation PhaserArc($id: ID!, $arc: Float!) {
        phaserArc(id: $id, arc: $arc)
      }
    `;
    const variables = {
      id: phaserId,
      arc: this.state.arc
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  changeArc = direction => {
    let { arc } = this.state;
    if (direction === "up") {
      arc += 0.04;
    } else {
      arc -= 0.04;
    }
    arc = Math.min(1, Math.max(0, arc));
    this.setState({
      arc
    });
    if (this.arcTimeout) {
      this.arcTimeout = setTimeout(() => this.changeArc(direction), 100);
    } else {
      this.setArc();
    }
  };
  updateArc(direction) {
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchend", this.mouseUp);
    this.arcTimeout = setTimeout(() => this.changeArc(direction), 100);
  }
  componentDidUpdate() {
    if (this.state.arc !== this.props.arc) {
      this.setState({
        arc: this.props.arc
      });
    }
  }
  render() {
    const { arc } = this.state;
    document.documentElement.style.setProperty(
      "--phaserArcRotate",
      `${arc * 10}deg`
    );
    const lasers = document.querySelector(".lasers");
    if (lasers && this.arcTimeout) {
      lasers.style.setProperty("display", "none");
      setTimeout(() => {
        lasers.style.setProperty("display", "block");
      }, 20);
    }
    return (
      <Row style={{ height: "200px" }} className="phaserArc">
        <Col sm={{ size: 4 }} style={{ marginTop: "50px" }}>
          <Button
            onMouseDown={this.updateArc.bind(this, "up")}
            onTouchStart={this.updateArc.bind(this, "up")}
            block
            color="warning"
          >
            Widen Arc
          </Button>
          <Button
            onMouseDown={this.updateArc.bind(this, "down")}
            onTouchStart={this.updateArc.bind(this, "down")}
            block
            color="warning"
          >
            Tighten Arc
          </Button>
          <p>Beam Arc: {Math.round(arc * 90)} Degrees</p>
        </Col>
        <Col sm={{ size: 8 }}>
          <div className="lasers">
            <div className="laser-beam" />
            <div className="laser-beam red" />
            <div className="laser-beam purple" />
            <div className="laser-beam green" />
          </div>
        </Col>
      </Row>
    );
  }
}
const PHASERS_QUERY = gql`
  query Phasers($simulatorId: ID!) {
    phasers(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      beams {
        id
        state
        charge
        heat
      }
      arc
    }
  }
`;

export default graphql(PHASERS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(PhaserCharging));

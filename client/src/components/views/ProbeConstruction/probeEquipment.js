import React, { Fragment } from "react";
import { Button, Row, Col, Card, CardBody } from "reactstrap";
import Transitioner from "../helpers/transitioner";

export default class ProbeEquipment extends Transitioner {
  constructor(props) {
    super(props);
    this.state = {
      shownDescription: null,
      equipment: props.equipment || []
    };
  }
  addToProbe = () => {
    let { equipment, selectedEquipment: e } = this.state;
    equipment = equipment.slice(0);
    const { selectedProbeType, probes } = this.props;
    const type = probes.types.find(p => p.id === selectedProbeType);
    const used = equipment.reduce((prev, next) => {
      return prev + next.count * next.size;
    }, 0);
    let eq = equipment.find(eq => eq.id === e.id);
    if (eq) {
      //Update the equipment
      if (used + eq.size < type.size) {
        eq.count += 1;
      }
    } else {
      //Add the equipment to the list
      if (used + e.size <= type.size) {
        equipment.push({
          id: e.id,
          name: e.name,
          description: e.description,
          size: e.size,
          count: 1
        });
      }
    }

    this.setState({
      equipment
    });
  };
  removeFromProbe = () => {
    let { equipment, selectedLoadedEquipment: e } = this.state;
    let eq = equipment.find(eq => eq.id === e.id);
    if (eq) {
      //Update the equipment
      eq.count -= 1;
    }
    this.setState({
      equipment: equipment.filter(eq => eq.count > 0)
    });
  };
  render() {
    const { selectedProbeType, probes, cancelProbe, prepareProbe } = this.props;
    const { shownDescription, equipment } = this.state;
    const type = probes.types.find(p => p.id === selectedProbeType);
    const used = equipment.reduce((prev, next) => {
      return prev + next.count * next.size;
    }, 0);
    return (
      <Fragment>
        <Row className="probeEquipment">
          <Col sm={8}>
            <Row>
              <Col sm="12">
                <h2>Available Equipment:</h2>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="8">
                        <strong>Name</strong>
                      </Col>
                      <Col sm="2">
                        <strong>Size</strong>
                      </Col>
                      <Col sm="2">
                        <strong>Qty</strong>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody className="equipmentList">
                    {type.availableEquipment.map(e => {
                      const used = equipment.find(eq => eq.id === e.id) || {
                        count: 0
                      };
                      return (
                        <Row
                          key={e.id}
                          onClick={() =>
                            this.setState({
                              selectedEquipment: e,
                              shownDescription: e.description
                            })
                          }
                          className="equipmentItem"
                          style={{
                            backgroundColor:
                              this.state.selectedEquipment &&
                              e.id === this.state.selectedEquipment.id
                                ? "rgba(255,255,0,0.3)"
                                : null
                          }}
                        >
                          <Col sm="8">
                            <p>{e.name}</p>
                          </Col>
                          <Col sm="2">
                            <p>{e.size}</p>
                          </Col>
                          <Col sm="2">
                            <p>{e.count - used.count}</p>
                          </Col>
                        </Row>
                      );
                    })}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col sm={6}>
                <Button
                  color="danger"
                  block
                  disabled={!this.state.selectedLoadedEquipment}
                  onClick={this.removeFromProbe}
                >
                  Remove Equipment
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  color="success"
                  block
                  disabled={!this.state.selectedEquipment}
                  onClick={this.addToProbe}
                >
                  Add Equipment
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col sm="12">
                <h2>Loaded Equipment:</h2>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        <strong>Name</strong>
                      </Col>
                      <Col sm="3">
                        <strong>Size</strong>
                      </Col>
                      <Col sm="3">
                        <strong>Qty</strong>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody className="equipmentList">
                    {equipment.map(e => (
                      <Row
                        key={e.id}
                        onClick={() =>
                          this.setState({
                            selectedLoadedEquipment: e,
                            shownDescription: e.description
                          })
                        }
                        className="equipmentItem"
                        style={{
                          backgroundColor:
                            this.state.selectedLoadedEquipment &&
                            e.id === this.state.selectedLoadedEquipment.id
                              ? "rgba(255,255,0,0.3)"
                              : null
                        }}
                      >
                        <Col sm="8">
                          <p>{e.name}</p>
                        </Col>
                        <Col sm="2">
                          <p>{e.size}</p>
                        </Col>
                        <Col sm="2">
                          <p>{e.count}</p>
                        </Col>
                      </Row>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col sm="4" className="probe-control-buttons">
            <p>
              <strong>Total Space: {type.size}</strong>
            </p>
            <p>
              <strong>Space Used: {used}</strong>
            </p>
            <p>
              <strong>Space Remaining: {type.size - used}</strong>
            </p>
            <Button
              block
              color="primary"
              onClick={prepareProbe.bind(this, equipment)}
            >
              Prepare Probe
            </Button>
            <Button block color="danger" onClick={cancelProbe}>
              Cancel Probe
            </Button>
            {shownDescription && (
              <p className="description">{shownDescription}</p>
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

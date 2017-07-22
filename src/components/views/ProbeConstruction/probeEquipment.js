import React from 'react';
import { Button, Row, Col, Card, CardBlock } from 'reactstrap';
import Transitioner from '../helpers/transitioner';

export default class ProbeEquipment extends Transitioner {
  constructor(props) {
    super(props);
    this.state = {
      shownDescription: null,
      equipment: props.equipment || []
    };
  }
  addToProbe(e) {
    let { equipment } = this.state;
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
  }
  removeFromProbe(e) {
    let { equipment } = this.state;
    let eq = equipment.find(eq => eq.id === e.id);
    if (eq) {
      //Update the equipment
      eq.count -= 1;
    }
    this.setState({
      equipment: equipment.filter(eq => eq.count > 0)
    });
  }
  render() {
    const { selectedProbeType, probes, cancelProbe, prepareProbe } = this.props;
    const { shownDescription, equipment } = this.state;
    const type = probes.types.find(p => p.id === selectedProbeType);
    const used = equipment.reduce((prev, next) => {
      return prev + next.count * next.size;
    }, 0);
    return (
      <Row className="probeEquipment">
        <Col sm="4">
          <p>Available Equipment:</p>
          <Card>
            <CardBlock>
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
            </CardBlock>
            <CardBlock
              onMouseOut={() => {
                this.setState({ shownDescription: null });
              }}
              className="equipmentList">
              {type.availableEquipment.map(e => {
                const used = equipment.find(eq => eq.id === e.id) || {
                  count: 0
                };
                return (
                  <Row
                    onClick={this.addToProbe.bind(this, e)}
                    onMouseOver={() => {
                      this.setState({ shownDescription: e.description });
                    }}
                    className="equipmentItem">
                    <Col sm="8">
                      <p>
                        {e.name}
                      </p>
                    </Col>
                    <Col sm="2">
                      <p>
                        {e.size}
                      </p>
                    </Col>
                    <Col sm="2">
                      <p>
                        {e.count - used.count}
                      </p>
                    </Col>
                  </Row>
                );
              })}
            </CardBlock>
          </Card>
        </Col>
        <Col sm="4">
          <p>
            Total Space: {type.size}
          </p>
          <p>
            Space Used: {used}
          </p>
          <p>
            Space Remaining: {type.size - used}
          </p>
          <Button
            block
            color="primary"
            onClick={prepareProbe.bind(this, equipment)}>
            Prepare Probe
          </Button>
          <Button block color="danger" onClick={cancelProbe}>
            Cancel Probe
          </Button>
          <p className="description">
            {shownDescription}
          </p>
        </Col>
        <Col sm="4">
          <p>Loaded Equipment:</p>
          <Card>
            <CardBlock>
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
            </CardBlock>
            <CardBlock
              onMouseOut={() => {
                this.setState({ shownDescription: null });
              }}
              className="equipmentList">
              {equipment.map(e =>
                <Row
                  onClick={this.removeFromProbe.bind(this, e)}
                  onMouseOver={() => {
                    this.setState({ shownDescription: e.description });
                  }}
                  className="equipmentItem">
                  <Col sm="8">
                    <p>
                      {e.name}
                    </p>
                  </Col>
                  <Col sm="2">
                    <p>
                      {e.size}
                    </p>
                  </Col>
                  <Col sm="2">
                    <p>
                      {e.count}
                    </p>
                  </Col>
                </Row>
              )}
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}

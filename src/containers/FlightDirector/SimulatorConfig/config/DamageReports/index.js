import React, { Component } from "react";
import { Row, Col, Card } from "reactstrap";
class DamageReportsConfig extends Component {
  state = {};
  render() {
    const { data, selectedSimulator, client } = this.props;
    const { selectedSystem } = this.state;
    const { systems } = selectedSimulator;
    return (
      <div>
        <h4>Damage Reports Config</h4>
        <Row>
          <Col>
            Systems<Card className="scroll">
              {systems.map(s => (
                <li
                  key={s.id}
                  onClick={() => this.setState({ selectedSystem: s.id })}
                  className={`list-group-item ${selectedSystem === s.id
                    ? "selected"
                    : ""}`}
                >
                  {s.name}
                </li>
              ))}
            </Card>
          </Col>
          <Col>
            Damage Report Steps<Card />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DamageReportsConfig;

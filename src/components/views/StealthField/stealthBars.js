import React from "react";
import { Row, Col } from "reactstrap";
import Transitioner from "../helpers/transitioner";

export default class StealthBars extends Transitioner {
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  render() {
    const { systems } = this.props;
    const stealthSystems = systems.filter(
      s => typeof s.stealthFactor === "number"
    );
    const group1 = stealthSystems.slice(0, stealthSystems.length / 2);
    const group2 = stealthSystems.slice(stealthSystems.length / 2);
    return (
      <Row className="stealthBars">
        <Col sm={6}>
          {group1.map(s => {
            return (
              <Row key={s.id} className="mt-1">
                <Col sm="3" className="text-right">
                  {this.systemName(s)}
                </Col>
                <Col sm="9">
                  <div className="stealth-bar-container">
                    <div
                      className="stealth-bar"
                      style={{
                        width: `${s.stealthFactor * 100}%`,
                        backgroundSize: `5px 3px, ${100 /
                          s.stealthFactor}%, ${100 / s.stealthFactor}%`
                      }}
                    />
                  </div>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col sm={6}>
          {group2.map(s => {
            return (
              <Row key={s.id} className="mt-1">
                <Col sm="3" className="text-right">
                  {this.systemName(s)}
                </Col>
                <Col sm="9">
                  <div className="stealth-bar-container">
                    <div
                      className="stealth-bar"
                      style={{
                        width: `${s.stealthFactor * 100}%`,
                        backgroundSize: `5px 3px, ${100 /
                          s.stealthFactor}%, ${100 / s.stealthFactor}%`
                      }}
                    />
                  </div>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    );
  }
}

import React, { Fragment } from "react";
import { Row, Col } from "helpers/reactstrap";
import Transitioner from "../helpers/transitioner";

export default class StealthBars extends Transitioner {
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }

    return sys.displayName || sys.name;
  }
  render() {
    const { systems } = this.props;
    const stealthSystems = systems.filter(
      s => typeof s.stealthFactor === "number"
    );
    return (
      <Row className="stealthBars">
        <Col className="stealth-columns">
          {stealthSystems.map(s => (
            <Fragment key={s.id}>
              <div className="stealth-bar-text">{this.systemName(s)}</div>
              <div className="stealth-bar-container">
                <div
                  className="stealth-bar"
                  style={{
                    width: `${s.stealthFactor * 100}%`,
                    backgroundSize: `5px 3px, ${100 / s.stealthFactor}%, ${100 /
                      s.stealthFactor}%`
                  }}
                />
              </div>
            </Fragment>
          ))}
        </Col>
      </Row>
    );
  }
}

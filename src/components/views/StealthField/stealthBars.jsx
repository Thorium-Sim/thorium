import React, {Fragment} from "react";
import {Row, Col} from "helpers/reactstrap";

const StealthBars = ({systems}) => {
  function systemName(sys) {
    if (sys.type === "Shield" && sys.name !== "Shields") {
      return `${sys.name} Shields`;
    }

    return sys.displayName || sys.name;
  }
  const stealthSystems = systems.filter(
    s => typeof s.stealthFactor === "number",
  );
  return (
    <Row className="stealthBars">
      <Col className="stealth-columns">
        {stealthSystems.map(s => (
          <Fragment key={s.id}>
            <div className="stealth-bar-text">{systemName(s)}</div>
            <div className="stealth-bar-container">
              <div
                className="stealth-bar"
                style={{
                  width: `${s.stealthFactor * 100}%`,
                  backgroundSize: `5px 3px, ${100 / s.stealthFactor}%, ${
                    100 / s.stealthFactor
                  }%`,
                }}
              />
            </div>
          </Fragment>
        ))}
      </Col>
    </Row>
  );
};

export default StealthBars;

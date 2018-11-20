import React from "react";
import { Row, Col } from "reactstrap";
import "./style.scss";

const probeTypes = ["class-i", "class-ii", "class-iii", "defense", "science"];
const probeImages = probeTypes.reduce((prev, next) => {
  prev[next] = require(`./probes/${next}.svg`);
  return prev;
}, {});

const ProbeSelector = ({
  types,
  selectedProbeType,
  selectProbe,
  setDescription,
  launching
}) => {
  return (
    <Row
      style={{
        position: "absolute",
        width: "100%"
      }}
    >
      <Col
        sm={12}
        className={`probe-container  ${
          selectedProbeType ? "probeSelected" : ""
        }`}
      >
        {types.map((t, i, arr) => {
          const selected = selectedProbeType === t.id ? "selected" : "";
          return (
            <div
              key={t.id}
              className={`probe-holder`}
              style={{
                transform: launching
                  ? `translate(20%,30%)`
                  : selected
                    ? `translate(30%, 60%)`
                    : `translateX(${(i * 80) / arr.length - 35}%)`
              }}
            >
              <div className={`probe-type ${selected}`}>
                <div
                  onMouseOut={setDescription.bind(this, null)}
                  onMouseOver={setDescription.bind(this, t.description)}
                  onClick={selectProbe.bind(this, t.id)}
                >
                  <p>
                    {t.name}: {t.count}
                  </p>
                  <img
                    alt="probe"
                    draggable="false"
                    src={probeImages[t.id]}
                    role="presentation"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default ProbeSelector;

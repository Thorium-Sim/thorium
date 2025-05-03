import React from "react";
import {Row, Col} from "helpers/reactstrap";
import "./style.scss";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";

import Probe1 from "./probes/class-i.svg";
import Probe2 from "./probes/class-ii.svg";
import Probe3 from "./probes/class-iii.svg";
import Probe4 from "./probes/defense.svg";
import Probe5 from "./probes/science.svg";

const probeImages = {
  "class-i": Probe1,
  "class-ii": Probe2,
  "class-iii": Probe3,
  defense: Probe4,
  science: Probe5,
};

const ProbeSelector = ({
  types,
  selectedProbeType,
  selectProbe,
  setDescription,
  launching,
}) => {
  const playEffect = useSoundEffect();
  return (
    <Row
      style={{
        position: "absolute",
        width: "100%",
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
                  : `translateX(${(i * 80) / arr.length - 35}%)`,
              }}
            >
              <div className={`probe-type ${selected}`}>
                <div
                  onMouseOut={()=>setDescription(null)}
                  onMouseOver={()=>setDescription(t.description)}
                  onClick={() => {
                    playEffect("buttonClick");
                    selectProbe(t.id);
                  }}
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

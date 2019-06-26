import React from "react";
import { Row, Col } from "helpers/reactstrap";
import useMeasure from "helpers/hooks/useMeasure";
import useSoundEffect from "helpers/hooks/useSoundEffect";

function calcBorderColor(i, power, powerLevels) {
  const color = i >= power ? "transparent" : "#0b0";
  if (powerLevels.indexOf(i + 1) > -1)
    return `${color} yellow ${color} ${color}`;
  return color;
}
const PowerLine = ({
  power,
  onChange,
  onChanging,
  maxPower,
  topPower,
  boxWidthRatio = 1,
  powerLevels,
  label,
  style,
  labelClass
}) => {
  const [storedPower, setStoredPower] = React.useState(power || 0);
  const powerRef = React.useRef();
  const [measureRef, { left, width }] = useMeasure();
  const playEffect = useSoundEffect();
  React.useEffect(() => {
    if (power) {
      setStoredPower(power);
    }
  }, [power]);
  const mouseDown = e => {
    playEffect("buttonClick");
    mouseMove(e);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchmove", mouseMove);
    document.addEventListener("touchend", mouseUp);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("touchmove", mouseMove);
    document.removeEventListener("touchend", mouseUp);
    onChange && onChange(powerRef.current);
  };
  const mouseMove = e => {
    const mouseX = e.pageX || e.touches[0].pageX;
    const boxWidth = width / (maxPower - boxWidthRatio) - 4;
    let newPower = Math.floor((mouseX - left) / boxWidth) - 1;
    if (newPower > topPower) return;
    if (newPower < 0) newPower = 0;
    setStoredPower(newPower);
    powerRef.current = newPower;
    onChanging && onChanging(newPower);
  };
  return (
    <Row className="power-bar-dragger" style={{ ...style }}>
      <Col sm={4} className={labelClass}>
        {label}
      </Col>

      <div className="col-sm-8 power-bar-holder" ref={measureRef}>
        <div className="power-line-holder">
          {powerLevels.map(n => {
            return (
              <div
                className="power-level"
                key={`powerLine-${n}`}
                style={{ left: `${(n + 1) * 14 - 7}px` }}
              />
            );
          })}
        </div>
        <div
          className="power-box zero"
          onMouseDown={mouseDown}
          onTouchStart={mouseDown}
        />
        {Array(maxPower)
          .fill(0)
          .map((n, i) => {
            return (
              <div
                style={{
                  backgroundColor: i >= storedPower ? "transparent" : null,

                  borderColor: calcBorderColor(i, storedPower, powerLevels)
                }}
                className={`power-box`}
                onMouseDown={mouseDown}
                onTouchStart={mouseDown}
                key={`powerLevel-${i}`}
              />
            );
          })}
      </div>
    </Row>
  );
};

PowerLine.defaultProps = {
  maxPower: 40,
  powerLevels: []
};

export default PowerLine;

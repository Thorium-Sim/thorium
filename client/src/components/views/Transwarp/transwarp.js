import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import PowerLine from "../JumpDrive/powerLine";

const Transwarp = props => {
  const {
    simulator: { assets },
    quad1,
    quad2,
    quad3,
    quad4,
    power,
    active
  } = props;
  const requiredPower = Object.values({ quad1, quad2, quad3, quad4 })
    .map(q =>
      Object.values(q).reduce(
        (prev, next) => prev + parseInt(next.required, 10),
        0
      )
    )
    .reduce((prev, next) => prev + parseInt(next, 10), 0);
  const usedPower = Object.values({ quad1, quad2, quad3, quad4 })
    .map(q =>
      Object.values(q).reduce(
        (prev, next) => prev + parseInt(next.value, 10),
        0
      )
    )
    .reduce((prev, next) => prev + parseInt(next, 10), 0);
  // Power total is current power level divided by the max power level times 300
  const powerTotal =
    (power.power / power.powerLevels[power.powerLevels.length - 1]) * 300;
  return (
    <div className="card-transwarp">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={`quad-${i}`} className={`quad quad${i + 1}`}>
            <ListGroup>
              <ListGroupItem active>
                <strong>Quadrant {i + 1}</strong>
              </ListGroupItem>
              <ListGroupItem>
                <PowerLine
                  powerLevels={[props[`quad${i + 1}`].field.required]}
                  maxPower={25}
                  onChange={value => {}}
                  topPower={25}
                  label={"E.M. Field"}
                  power={props[`quad${i + 1}`].field.value}
                />

                <PowerLine
                  powerLevels={[props[`quad${i + 1}`].core.required]}
                  maxPower={25}
                  onChange={value => {}}
                  topPower={25}
                  label={"Transwarp Core"}
                  power={props[`quad${i + 1}`].core.value}
                />

                <PowerLine
                  powerLevels={[props[`quad${i + 1}`].warp.required]}
                  maxPower={25}
                  onChange={value => {}}
                  topPower={25}
                  label={"Warp Field"}
                  power={props[`quad${i + 1}`].warp.value}
                />
              </ListGroupItem>
            </ListGroup>
          </div>
        ))}
      <div className="ship">
        <img src={`/assets${assets.top}`} alt="Ship Top" />
      </div>
      <div className="power">
        <h1>Power Used: {usedPower}</h1>
        <h1>
          Power Required:{" "}
          <span className={usedPower !== requiredPower ? "text-danger" : ""}>
            {requiredPower}
          </span>
        </h1>
        <h1>Power Available: {powerTotal}</h1>
      </div>
      <div className="activate">
        <Button block color="danger" size="lg">
          {active ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
};
export default Transwarp;

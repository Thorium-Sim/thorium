import React from "react";
import {Card, CardBody, Button} from "helpers/reactstrap";
import {capitalCase} from "change-case";
import partsImages from "./parts";
import DamageOverlay from "../helpers/DamageOverlay";

const Exocomp = ({
  id,
  state,
  parts,
  completion,
  destination = {},
  number,
  select,
  recall,
  damage,
  upgrade = () => {},
}) => {
  return (
    <Card className="exocomp-box">
      <DamageOverlay message="Exocomp Offline" system={{damage, power: {}}} />
      <CardBody>
        <span className="exocomp-title">#{number}</span>
        <p>Status: {capitalCase(state)}</p>
        <p>Completion: {Math.round(completion * 100)}%</p>
        <p>Destination: {destination && destination.displayName}</p>
        {state === "upgrading" ? (
          <p className="text-warning">Ready to Upgrade</p>
        ) : (
          <>
            <p>Parts:</p>
            <div className="parts-holder">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`part-${id}-${i}`}
                    className="exocomp-part"
                    style={{
                      backgroundImage: `url('${partsImages[parts[i]]}')`,
                    }}
                  />
                ))}
            </div>
          </>
        )}
        {state === "idle" ? (
          <div>
            <Button color="info" onClick={() => select(id, true)}>
              Upgrade
            </Button>
            <Button color="primary" onClick={() => select(id)}>
              Assign
            </Button>
          </div>
        ) : (
          <div>
            {state === "upgrading" && (
              <Button color="warning" onClick={() => upgrade(id)}>
                Attempt Upgrade
              </Button>
            )}
            <Button color="danger" onClick={recall}>
              Recall
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Exocomp;

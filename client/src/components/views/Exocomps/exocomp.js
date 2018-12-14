import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { titleCase } from "change-case";
import partsImages from "./parts";

const Exocomp = ({
  id,
  state,
  parts,
  completion,
  destination = {},
  number,
  select,
  recall
}) => {
  return (
    <Card className="exocomp-box">
      <CardBody>
        <span className="exocomp-title">#{number}</span>
        <p>Status: {titleCase(state)}</p>
        <p>Completion: {Math.round(completion * 100)}%</p>
        <p>Destination: {destination && destination.displayName}</p>
        <p>Parts:</p>
        <div className="parts-holder">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={`part-${id}-${i}`}
                className="exocomp-part"
                style={{
                  backgroundImage: `url('${partsImages[parts[i]]}')`
                }}
              />
            ))}
        </div>
        {state === "idle" ? (
          <Button color="primary" onClick={() => select(id)}>
            Assign
          </Button>
        ) : (
          <Button color="danger" onClick={recall}>
            Recall
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Exocomp;

import React from "react";
import {
  Simulator,
  useCountermeasuresSubscription,
  useCountermeasureSetResourceMutation,
} from "generated/graphql";
import "./style.scss";
import {capitalCase} from "change-case";
import {InputField} from "components/generic/core";
import {ListGroup, ListGroupItem} from "reactstrap";

interface CountermeasuresCoreProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const CountermeasuresCore: React.FC<CountermeasuresCoreProps> = props => {
  const {simulator} = props;
  const {loading, data} = useCountermeasuresSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [setMaterialLevel] = useCountermeasureSetResourceMutation();
  const [countermeasureId, setCountermeasureId] = React.useState<string | null>(
    null,
  );
  if (loading || !data) return null;
  const {countermeasuresUpdate: countermeasures} = data;
  if (!countermeasures) return <div>No Countermeasures</div>;

  const countermeasure = countermeasures.launched.find(
    l => l.id === countermeasureId,
  );
  return (
    <div className="core-countermeasures">
      <div className="countermeasure-list">
        {countermeasures.launched.length > 0 ? (
          <ListGroup>
            {countermeasures.launched.map(l => (
              <ListGroupItem
                key={l.id}
                onClick={() => setCountermeasureId(l.id)}
              >
                {l.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          "No Countermeasures Launched"
        )}
        <div className="countermeasure-info">
          {countermeasure && (
            <>
              <p>
                <strong>Name</strong>
              </p>
              <p>{countermeasure.name}</p>
              <p>
                <strong>Modules</strong>
              </p>
              {countermeasure.modules.map(m => (
                <div key={m.id} className="module-list">
                  <p>
                    <strong>{m.name}</strong>
                  </p>
                  {Object.entries(m.config).map(([config, setting]) => (
                    <p>
                      <em>{config}</em>: {setting}
                    </p>
                  ))}
                </div>
              ))}
              <p>
                <strong>Power</strong>
              </p>
              <p>
                {Math.abs(
                  1 -
                    countermeasure.totalPowerUsed /
                      countermeasure.availablePower,
                ) * 100}
                %
              </p>
            </>
          )}
        </div>
      </div>
      <div className="materials-list">
        {Object.entries(countermeasures.materials).map(([key, value]) => (
          <label key={key}>
            {capitalCase(key)}
            <InputField
              alert={value === 0}
              prompt={`What is the new ${key} amount?`}
              promptValue={value}
              onClick={(e: string) =>
                setMaterialLevel({
                  variables: {
                    id: countermeasures.id,
                    resource: key,
                    value: parseInt(e, 10),
                  },
                })
              }
            >
              {value}
            </InputField>
          </label>
        ))}
      </div>
    </div>
  );
};
export default CountermeasuresCore;

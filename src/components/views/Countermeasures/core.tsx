import React from "react";
import {
  Simulator,
  Countermeasure,
  useCountermeasuresSubscription,
  useCountermeasureSetResourceMutation,
  useCountermeasuresSetFdNoteMutation,
} from "generated/graphql";
import "./style.scss";
import {capitalCase} from "change-case";
import {InputField} from "components/generic/core";
import {ListGroup, ListGroupItem} from "reactstrap";
import {Input} from "reactstrap";
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
  const [setNote] = useCountermeasuresSetFdNoteMutation();
  const [countermeasureId, setCountermeasureId] = React.useState<string | null>(
    null,
  );
  if (loading || !data) return null;
  const {countermeasuresUpdate: countermeasures} = data;
  if (!countermeasures) return <div>No Countermeasures</div>;

  const countermeasure =
    countermeasures.launched.find(l => l.id === countermeasureId) ||
    (Object.values(countermeasures.slots).find(slot => {
      if (!slot) return false;
      const l = slot as Countermeasure;
      return l?.id === countermeasureId;
    }) as Countermeasure);
  return (
    <div className="core-countermeasures">
      <div className="countermeasure-list">
        <ListGroup>
          <ListGroupItem>
            <strong>Build Slots</strong>
          </ListGroupItem>
          {Object.entries(countermeasures.slots).map(([slot, value]) => {
            if (!value) return null;
            const countermeasure = value as Countermeasure;
            return (
              <ListGroupItem
                key={slot}
                className={`${
                  countermeasure.building && countermeasure.buildPercentage < 1
                    ? "text-success"
                    : ""
                } ${countermeasure.buildPercentage === 1 ? "text-info" : ""} ${
                  countermeasure.active ? "text-warning" : ""
                }`}
                title={`${
                  countermeasure.building && countermeasure.buildPercentage < 1
                    ? "Building"
                    : ""
                } ${countermeasure.buildPercentage === 1 ? "Built" : ""} ${
                  countermeasure.active ? "Active" : ""
                }`}
                onClick={() => setCountermeasureId(countermeasure.id)}
              >
                {slot}: {countermeasure.name}
              </ListGroupItem>
            );
          })}
          <ListGroupItem>
            <strong>Launched</strong>
          </ListGroupItem>
          {countermeasures.launched.map(l => (
            <ListGroupItem
              key={l.id}
              className={`${l.active ? "text-warning" : ""}`}
              onClick={() => setCountermeasureId(l.id)}
            >
              {l.name}
            </ListGroupItem>
          ))}
        </ListGroup>
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
              {countermeasure.building && countermeasure.buildPercentage < 1 && (
                <>
                  <p>
                    <strong>Build Progress</strong>
                  </p>
                  <p>{Math.round(countermeasure.buildPercentage * 100)}%</p>
                </>
              )}
              <p>
                <strong>Power</strong>
              </p>
              <p>
                {Math.round(
                  Math.abs(
                    1 -
                      countermeasure.totalPowerUsed /
                        countermeasure.availablePower,
                  ) * 100,
                )}
                %
              </p>
              <p>
                <strong>Note</strong>
              </p>
              <Input
                key={countermeasure.id}
                type="textarea"
                rows={5}
                defaultValue={countermeasure.note}
                onBlur={e =>
                  setNote({
                    variables: {
                      id: countermeasures.id,
                      countermeasureId: countermeasure.id,
                      note: e.target.value,
                    },
                  })
                }
              />
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

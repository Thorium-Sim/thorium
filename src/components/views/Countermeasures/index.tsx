import React from "react";
import {
  Simulator,
  useCountermeasuresSubscription,
  useCountermeasureModulesQuery,
  CountermeasureSlot,
  Countermeasure,
  CountermeasureModule,
  useCountermeasureRemoveModuleMutation,
  CountermeasureSlotEnum,
} from "generated/graphql";
import {ReactComponent as CenterSVG} from "./countermeasure-center.svg";
import "./style.scss";
import {Button} from "reactstrap";

interface CenterProps {
  setSlot: (nextState: string) => void;
  slot: (Countermeasure & {slotId: string}) | null;
  slots: CountermeasureSlot;
}
const Center: React.FC<CenterProps> = ({slots, slot, setSlot}) => {
  return (
    <div className="inner-center">
      {Object.entries(slots)
        .filter(([key]) => key !== "__typename")
        .map(([key, value]) => {
          if (typeof value === "string") return null;
          return (
            <div
              key={key}
              className={`slot ${key} ${
                slot?.slotId === key ? "selected" : ""
              } ${value?.locked ? "locked" : ""} ${
                value?.active ? "active" : ""
              }`}
              style={{
                ["--end-angle" as any]: value?.building
                  ? `${(value.buildPercentage || 0) * 100}%`
                  : "0%",
              }}
              onClick={() => setSlot(key)}
            ></div>
          );
        })}
      <CenterSVG />
    </div>
  );
};

interface ModuleProps {
  countermeasuresId: string;
  slotId: CountermeasureSlotEnum;
  moduleObject: CountermeasureModule | null;
  moduleIndex: number;
  setAddingModule: () => void;
  setSelectedModule: (nextState: number | null) => void;
}

const Module: React.FC<ModuleProps> = ({
  countermeasuresId,
  slotId,
  moduleObject,
  moduleIndex,
  setAddingModule,
  setSelectedModule,
}) => {
  const [removeModule] = useCountermeasureRemoveModuleMutation();
  return (
    <div className="module-container">
      <div
        className="module-card card"
        onClick={() => setSelectedModule(moduleIndex)}
      >
        {moduleObject ? moduleObject.name : "Empty"}
      </div>
      {moduleObject ? (
        <Button
          color="danger"
          onClick={() =>
            removeModule({
              variables: {
                id: countermeasuresId,
                slot: slotId,
                moduleId: moduleObject.id,
              },
            })
          }
        >
          Remove
        </Button>
      ) : (
        <Button color="success" onClick={setAddingModule}>
          Add
        </Button>
      )}
    </div>
  );
};

const MaterialRadial: React.FC<{
  label: string;
  count: number;
  max: number;
}> = ({label, count, max}) => {
  return (
    <div className="material">
      <div
        className="radial-dial"
        style={{
          ["--end-angle" as any]: `${(count / max) * 100}%`,
        }}
        data-value={count}
      ></div>
      <div className="label">{label}</div>
    </div>
  );
};
interface CountermeasuresProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const Countermeasures: React.FC<CountermeasuresProps> = props => {
  const {simulator} = props;
  const {loading, data} = useCountermeasuresSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: modulesData} = useCountermeasureModulesQuery();
  const moduleTypes = modulesData?.countermeasureModuleType || [];
  const [slotId, setSlotId] = React.useState<string | null>(null);
  const [selectedModule, setSelectedModule] = React.useState<number | null>(
    null,
  );
  const [addingModule, setAddingModule] = React.useState<boolean>(false);

  if (loading || !data) return <div>No Countermeasures System</div>;
  const {countermeasuresUpdate: countermeasures} = data;
  if (!countermeasures) return <div>No Countermeasures System</div>;
  const selectedSlot = countermeasures.slots[
    slotId as CountermeasureSlotEnum
  ] as Countermeasure;
  const slot = slotId ? {...selectedSlot, slotId} : null;

  return (
    <div className="card-countermeasures">
      <div className="countermeasure">
        <h2>Countermeasure</h2>
      </div>
      <div className="modules">
        <h2>Modules</h2>
        {Array.from({length: 5}).map((_, i) => (
          <Module
            key={`module-${i}`}
            countermeasuresId={countermeasures.id}
            slotId={(slotId as CountermeasureSlotEnum) || null}
            moduleObject={slot?.modules?.[i] || null}
            moduleIndex={i}
            setAddingModule={() => setAddingModule(true)}
            setSelectedModule={setSelectedModule}
          />
        ))}
      </div>
      <div className="materials">
        <h2>Materials</h2>
        <div className="materials-container">
          {countermeasures.materials &&
            Object.entries(countermeasures.materials).map(([key, value]) => {
              if (typeof value !== "number") return null;
              return (
                <MaterialRadial key={key} label={key} count={value} max={30} />
              );
            })}
        </div>
      </div>
      <div className="center">
        <Center
          slots={countermeasures.slots as CountermeasureSlot}
          slot={slot}
          setSlot={setSlotId}
        />
      </div>
    </div>
  );
};
export default Countermeasures;

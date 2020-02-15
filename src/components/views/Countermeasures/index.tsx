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
  useCountermeasureCreateCountermeasureMutation,
  useCountermeasuresBuildCountermeasureMutation,
  useCountermeasureRemoveCountermeasureMutation,
  useCountermeasuresLaunchCountermeasureMutation,
  useCountermeasuresAddModuleMutation,
} from "generated/graphql";
import {ReactComponent as CenterSVG} from "./countermeasure-center.svg";
import "./style.scss";
import {Button, Input, Progress} from "reactstrap";

import {ReactComponent as battery_cell} from "./modules/battery_cell.svg";
import {ReactComponent as explosive_payload} from "./modules/explosive_payload.svg";
import {ReactComponent as proximity_trigger} from "./modules/proximity_trigger.svg";
import {ReactComponent as beacon} from "./modules/beacon.svg";
import {ReactComponent as heat_coil} from "./modules/heat_coil.svg";
import {ReactComponent as scan_trigger} from "./modules/scan_trigger.svg";
import {ReactComponent as chaff_deploy} from "./modules/chaff_deploy.svg";
import {ReactComponent as ionizer} from "./modules/ionizer.svg";
import {ReactComponent as sensor_scrambler} from "./modules/sensor_scrambler.svg";
import {ReactComponent as communications_array} from "./modules/communications_array.svg";
import {ReactComponent as notifier} from "./modules/notifier.svg";
import {ReactComponent as transport_inhibitor} from "./modules/transport_inhibitor.svg";
import {capitalCase} from "change-case";

const moduleImages: {[key: string]: any} = {
  battery_cell,
  explosive_payload,
  proximity_trigger,
  beacon,
  heat_coil,
  scan_trigger,
  chaff_deploy,
  ionizer,
  sensor_scrambler,
  communications_array,
  notifier,
  transport_inhibitor,
};

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
              className={`slot ${key} ${value?.id ? "exists" : ""} ${
                slot?.slotId === key ? "selected" : ""
              } ${value?.locked ? "locked" : ""} ${
                value?.building ? "building" : ""
              } ${value?.active ? "active" : ""}`}
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
  disabled: boolean;
  countermeasuresId: string;
  slotId: CountermeasureSlotEnum;
  moduleObject: CountermeasureModule | null;
  moduleIndex: number;
  setAddingModule: () => void;
  setSelectedModule: (nextState: number | null) => void;
}

const Module: React.FC<ModuleProps> = ({
  disabled,
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
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.1) ${(moduleObject?.buildProgress ||
            0) * 100}%, rgba(255,255,255,0) ${(moduleObject?.buildProgress ||
            0) * 100}%, transparent 100%)`,
        }}
        onClick={() => setSelectedModule(moduleIndex)}
      >
        {moduleObject ? moduleObject.name : "Empty"}
      </div>
      {moduleObject ? (
        <Button
          color="danger"
          disabled={disabled}
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
        <Button disabled={disabled} color="success" onClick={setAddingModule}>
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
        className={`radial-dial ${label}`}
        style={{
          ["--end-angle" as any]: `${(count / max) * 100}%`,
        }}
        data-value={Math.round(count)}
      ></div>
      <div className="label">{capitalCase(label)}</div>
    </div>
  );
};

interface CreateButtonProps {
  countermeasureId: string;
  slotId: CountermeasureSlotEnum;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  countermeasureId,
  slotId,
}) => {
  const [settingName, setSettingName] = React.useState(false);
  const [name, setName] = React.useState("");
  const [addCountermeasure] = useCountermeasureCreateCountermeasureMutation({
    variables: {
      id: countermeasureId,
      slot: slotId,
      name,
    },
  });

  return settingName ? (
    <div className="countermeasure-name">
      <Input
        type="text"
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        color="danger"
        onClick={() => {
          setSettingName(false);
          setName("");
        }}
      >
        Cancel
      </Button>
      <Button
        color="success"
        disabled={!name}
        onClick={() => {
          addCountermeasure();
          setSettingName(false);
          setName("");
        }}
      >
        Create
      </Button>
    </div>
  ) : (
    <Button
      block
      disabled={!slotId}
      color="success"
      onClick={() => setSettingName(true)}
    >
      Create Countermeasure
    </Button>
  );
};

interface ModuleConstructionProps {
  id: string;
  slot: CountermeasureSlotEnum;
  cancel: () => void;
}
const ModuleConstruction: React.FC<ModuleConstructionProps> = ({
  id,
  slot,
  cancel,
}) => {
  const {data: modulesData} = useCountermeasureModulesQuery();
  const moduleTypes = modulesData?.countermeasureModuleType || [];

  const [selectedModule, setSelectedModule] = React.useState<string | null>(
    null,
  );
  const [addModule] = useCountermeasuresAddModuleMutation({
    variables: {id, moduleType: selectedModule as string, slot},
  });
  return (
    <div className="module-construction">
      <h2>Module Construction</h2>
      <div className="module-selection">
        {moduleTypes.map(m => {
          const ImageComponent = moduleImages[m?.id || ""] || (() => null);
          return (
            <div
              key={m.id}
              className={`module-type-description ${
                m.id === selectedModule ? "selected" : ""
              }`}
              onClick={() => setSelectedModule(m.id)}
            >
              <div className="module-type-upper">
                <div className="module-type-image">
                  <ImageComponent />
                </div>
                <div className="module-type-info">
                  <h3>{m.name}</h3>
                  <div>{m.description}</div>
                </div>
              </div>
              <div className="module-type-resource">
                {m.resourceRequirements &&
                  Object.entries(m.resourceRequirements).map(([key, value]) => {
                    if (typeof value !== "number" || value === 0) return null;
                    return (
                      <MaterialRadial
                        key={key}
                        label={key}
                        count={value}
                        max={30}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <Button color="danger" onClick={cancel}>
          Cancel
        </Button>
        <div className="spacer"></div>
        <Button
          color="success"
          disabled={!selectedModule}
          onClick={() => {
            addModule();
            cancel();
          }}
        >
          Add Module
        </Button>
      </div>
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

  const [buildCountermeasure] = useCountermeasuresBuildCountermeasureMutation();
  const [
    launchCountermeasure,
  ] = useCountermeasuresLaunchCountermeasureMutation();
  const [
    removeCountermeasure,
  ] = useCountermeasureRemoveCountermeasureMutation();

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
      {addingModule ? (
        <ModuleConstruction
          id={countermeasures.id}
          slot={slotId as CountermeasureSlotEnum}
          cancel={() => setAddingModule(false)}
        />
      ) : (
        <>
          <div className="countermeasure">
            <h2>Countermeasure</h2>
            {!slot?.id && (
              <CreateButton
                key={slotId || undefined}
                countermeasureId={countermeasures.id}
                slotId={slotId as CountermeasureSlotEnum}
              />
            )}
            {slot?.id &&
              (slot?.building ? (
                slot?.buildPercentage < 1 ? (
                  <div className="build-progress">
                    <h4>Build Progress</h4>
                    <div className="progress-bar-container">
                      <Progress bar value={slot.buildPercentage * 100}>
                        {Math.round(slot.buildPercentage * 100)}%
                      </Progress>
                    </div>
                  </div>
                ) : (
                  <Button
                    block
                    color="success"
                    onClick={() =>
                      launchCountermeasure({
                        variables: {
                          id: countermeasures.id,
                          slot: slotId as CountermeasureSlotEnum,
                        },
                      })
                    }
                  >
                    Deploy Countermeasure
                  </Button>
                )
              ) : (
                <Button
                  block
                  color="warning"
                  disabled={!slotId || slot?.modules?.length === 0}
                  onClick={() =>
                    buildCountermeasure({
                      variables: {
                        id: countermeasures.id,
                        slot: slotId as CountermeasureSlotEnum,
                      },
                    })
                  }
                >
                  Build Countermeasure
                </Button>
              ))}
            {slot?.id && (
              <Button
                block
                color="danger"
                onClick={() =>
                  removeCountermeasure({
                    variables: {
                      id: countermeasures.id,
                      slot: slotId as CountermeasureSlotEnum,
                    },
                  })
                }
              >
                Remove Countermeasure
              </Button>
            )}
          </div>
          {slot?.id && (
            <div className="modules">
              <h2>Modules</h2>
              {Array.from({length: 5}).map((_, i) => (
                <Module
                  key={`module-${i}`}
                  disabled={!slot || slot.building || slot.active}
                  countermeasuresId={countermeasures.id}
                  slotId={(slotId as CountermeasureSlotEnum) || null}
                  moduleObject={slot?.modules?.[i] || null}
                  moduleIndex={i}
                  setAddingModule={() => setAddingModule(true)}
                  setSelectedModule={setSelectedModule}
                />
              ))}
            </div>
          )}
        </>
      )}
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

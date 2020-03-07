import React from "react";
import {
  Simulator,
  useCountermeasuresSubscription,
  CountermeasureSlot,
  Countermeasure,
  CountermeasureSlotEnum,
  useCountermeasuresBuildCountermeasureMutation,
  useCountermeasureRemoveCountermeasureMutation,
  useCountermeasuresLaunchCountermeasureMutation,
  useCountermeasuresLaunchUnlockedCountermeasuresMutation,
  useCountermeasuresActivateCountermeasureMutation,
  useCountermeasuresDeactivateCountermeasureMutation,
} from "generated/graphql";
import {Button, Progress} from "reactstrap";
import "./style.scss";
import ModuleConstruction from "./ModuleConstruction";
import CreateButton from "./CreateButton";
import Module from "./Module";
import MaterialRadial from "./MaterialRadial";
import Center from "./Center";
import ModuleConfig from "./ModuleConfig";
import TourHelper from "helpers/tourHelper";

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Countermeasures are small devices which you construct on your ship and release into space. They can be created with certain capabilities and be pre-programmed with functions for when to activate those capabilities.",
  },
  {
    selector: ".center",
    content:
      "This is where countermeasures are constructed. There are eight slots which can independently construct countermeasures. Once a countermeasure is constructed, it remains in its slot until it is deployed into space.",
  },
  {
    selector: ".slot1",
    content:
      "To configure a slot to construct a countermeasure, click on the slot. Click on this one now.",
  },
  {
    selector: ".create-countermeasure",
    content: "Click this button to create a countermeasure in this slot.",
  },
  {
    selector: ".countermeasure-name",
    content: 'Enter a name for your countermeasure and click "Create"',
  },
  {
    selector: ".modules",
    content:
      "You can now add up to five modules to your countermeasure. These modules are what determine what your countermeasure will do when it is deployed into space. You can add more than one of the same kind of module, or all different kinds of modules.",
  },
  {
    selector: ".modules .add",
    content: "Click this button to add a module to your countermeasure.",
  },
  {
    selector: ".module-construction",
    content:
      'This is where you can see all the available modules that can be constructed. Scroll through this list and read the descriptions of each so you know what can be done. Also notice that each module has certain resource requirements to be built. Choose a module and click "Add Module"',
  },
  {
    selector: ".materials-container",
    content:
      "This is where you can see the available materials. If you run out of a certain material, you won't be able to add modules that require that material.",
  },
  {
    selector: ".config-button",
    content: "Now we can configure the newly added module. Click this button.",
  },
  {
    selector: ".configuration",
    content:
      "This is where you configure the module. Each module type has different configuration options. The most important one is when the module triggers. This determines what activates the module. ",
  },
  {
    selector: ".configuration",
    content:
      "Options for configuring the trigger include activating immediately, after a delay which you can specify in seconds, or with a remote access code which you can pre-determine and then transmit to the countermeasure. If you have a Proximity or Scan Trigger module attached to your countermeasure, you can select those to trigger this module.",
  },
  {
    selector: ".build-countermeasure",
    content:
      "Once you have added and configured all of your modules, click this button to build the countermeasure. Each of the modules will be fabricated, programmed, and attached to the countermeasure. This process takes longer if you have many modules on your countermeasure. The good news is that you can create more countermeasures while this one builds.",
  },
  {
    selector: ".deploy-countermeasure",
    content:
      "After your countermeasure is constructed, you can deploy it into space by clicking this button.",
  },
  {
    selector: ".deploy-all",
    content:
      "If you have created and built multiple countermeasures, you can deploy all of them at the same time by clicking this button.",
  },
  {
    selector: ".nothing",
    content:
      "There are many possible combinations of modules you can put into countermeasures to create all kinds of effects. You could create a decoy, a proximity-triggered mine, or use a chaff module to block an incoming projectile. Try to be creative as you come up with countermeasure configurations.",
  },
];

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
  const [deployAll] = useCountermeasuresLaunchUnlockedCountermeasuresMutation();
  const [activate] = useCountermeasuresActivateCountermeasureMutation();
  const [deactivate] = useCountermeasuresDeactivateCountermeasureMutation();

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
  const selectedModuleObj =
    selectedModule !== null ? selectedSlot?.modules[selectedModule] : null;
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
            {!slot?.id ? (
              <CreateButton
                key={slotId || undefined}
                countermeasureId={countermeasures.id}
                slotId={slotId as CountermeasureSlotEnum}
              />
            ) : (
              <h4>{slot.name}</h4>
            )}
            {slot?.id &&
              (slot?.building ? (
                slot?.buildPercentage < 1 ? (
                  <div className="build-progress">
                    <div className="progress-bar-container">
                      <Progress bar value={slot.buildPercentage * 100}>
                        {Math.round(slot.buildPercentage * 100)}%
                      </Progress>
                    </div>
                  </div>
                ) : (
                  <Button
                    block
                    className="deploy-countermeasure"
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
                  className="build-countermeasure"
                  color="warning"
                  disabled={!slotId || slot?.modules?.length === 0}
                  onClick={() => {
                    setSelectedModule(null);
                    setAddingModule(false);
                    buildCountermeasure({
                      variables: {
                        id: countermeasures.id,
                        slot: slotId as CountermeasureSlotEnum,
                      },
                    });
                  }}
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
                <MaterialRadial key={key} label={key} count={value} max={99} />
              );
            })}
        </div>
      </div>
      <div className="center">
        <Center
          slots={countermeasures.slots as CountermeasureSlot}
          slot={slot}
          setSlot={id => {
            setSlotId(id);
            setSelectedModule(null);
          }}
        />
      </div>
      {slotId && slot && selectedModuleObj && (
        <div className="configuration">
          <h2>Configuration</h2>
          <ModuleConfig
            id={countermeasures.id}
            slot={slotId as CountermeasureSlotEnum}
            moduleObj={selectedModuleObj}
            allModuleTypes={slot.modules.map(m => m.name)}
          />
        </div>
      )}
      <div className="deploy-all">
        <Button
          color="danger"
          block
          onClick={() => deployAll({variables: {id: countermeasures.id}})}
        >
          Deploy All Built Countermeasures
        </Button>
        {slot &&
          slot.buildPercentage === 1 &&
          (slot.active ? (
            <Button
              color="danger"
              block
              onClick={() =>
                deactivate({
                  variables: {
                    id: countermeasures.id,
                    slot: slotId as CountermeasureSlotEnum,
                  },
                })
              }
            >
              Deactivate Selected Countermeasure
            </Button>
          ) : (
            <Button
              color="warning"
              block
              onClick={() =>
                activate({
                  variables: {
                    id: countermeasures.id,
                    slot: slotId as CountermeasureSlotEnum,
                  },
                })
              }
            >
              Activate Selected Countermeasure
            </Button>
          ))}
      </div>
      <TourHelper steps={trainingSteps} />
    </div>
  );
};
export default Countermeasures;

import React from "react";
import {
  useCountermeasureModulesQuery,
  CountermeasureSlotEnum,
  useCountermeasuresAddModuleMutation,
} from "generated/graphql";
import {Button} from "reactstrap";
import MaterialRadial from "./MaterialRadial";

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
        {moduleTypes
          .concat()
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .map(m => {
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
                  <h3>{m.name}</h3>
                  <div className="module-type-info">
                    <div className="module-type-image">
                      <ImageComponent />
                    </div>
                    <div>{m.description}</div>
                  </div>
                </div>
                <div className="module-type-resource">
                  {m.resourceRequirements &&
                    Object.entries(m.resourceRequirements).map(
                      ([key, value]) => {
                        if (typeof value !== "number" || value === 0)
                          return null;
                        return (
                          <MaterialRadial
                            key={key}
                            label={key}
                            count={value}
                            max={30}
                          />
                        );
                      },
                    )}
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

export default ModuleConstruction;

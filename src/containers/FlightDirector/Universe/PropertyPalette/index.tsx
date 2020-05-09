import React from "react";
import {Entity} from "generated/graphql";
import Identity from "./Identity";
import Appearance from "./Appearance";
import Location from "./Location";
import Template from "./Template";
// import Glow from "./Glow";
import "../styles.scss";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import Light from "./Light";
import Systems from "./Systems";
import Stage from "./Stage";
import {Button, Label, Input} from "reactstrap";
import {UseStore} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {CanvasContext} from "../CanvasContext";

interface PropertyPaletteProps {
  selectedEntity?: Entity;
  useEntityState: UseStore<PatchData<Entity[]>>;
  currentStage?: string;
  setCurrentStage?: React.Dispatch<React.SetStateAction<string>>;
}
const PropertyPalette: React.FC<PropertyPaletteProps> = ({
  selectedEntity: realSelectedEntity,
  useEntityState,
  currentStage,
  setCurrentStage,
}) => {
  const [{selected, controllingEntityId}, dispatch] = React.useContext(
    CanvasContext,
  );

  const selectedEntity =
    useEntityState(
      ({data: entities}) =>
        entities.find(e => selected && e.id === selected[0]) ||
        entities.find(e => e.id === currentStage),
    ) || realSelectedEntity;

  const [getAsset, setGetAsset] = React.useState<{
    label: string;
    current: string;
    dir: string;
    cb: Function;
  } | null>(null);
  if (getAsset) {
    return (
      <div>
        <h3>Select asset for {getAsset.label}</h3>
        <FileExplorer
          simple
          directory={getAsset.dir}
          selectedFiles={[getAsset.current]}
          onClick={(_evt: any, container: {id: string; fullPath: string}) => {
            getAsset.cb(container.fullPath);
            setGetAsset(null);
          }}
        />
      </div>
    );
  }
  return (
    <div className="control-palette">
      <h2>Property Palette</h2>
      {selectedEntity && (
        <>
          {selectedEntity.identity && (
            <Identity
              id={selectedEntity.id}
              identity={selectedEntity.identity}
            />
          )}
          {currentStage !== selectedEntity.id && selectedEntity.stage && (
            <Button
              size="sm"
              onClick={() => {
                setCurrentStage?.(selectedEntity.id);
                dispatch({type: "recenter"});
              }}
            >
              Enter Stage
            </Button>
          )}
          {setCurrentStage && currentStage !== selectedEntity.id && (
            <Label>
              <Input
                type="checkbox"
                active={controllingEntityId === selectedEntity.id}
                onClick={() =>
                  dispatch({
                    type: "controllingEntity",
                    id:
                      controllingEntityId === selectedEntity.id
                        ? ""
                        : selectedEntity.id,
                  })
                }
              />
              Control Entity
            </Label>
          )}
          {!selectedEntity.template && (
            <Stage
              id={selectedEntity.id}
              stage={selectedEntity.stage || undefined}
              stageChild={selectedEntity.stageChild || undefined}
              currentStage={currentStage || ""}
              setCurrentStage={setCurrentStage}
            />
          )}
          {selectedEntity.template && (
            <Template
              id={selectedEntity.id}
              template={selectedEntity.template}
            />
          )}
          {selectedEntity.appearance && (
            <Appearance
              id={selectedEntity.id}
              appearance={selectedEntity.appearance}
              setAsset={(label, dir, current, cb) =>
                setGetAsset({label, dir, current, cb})
              }
            />
          )}
          {selectedEntity.location && (
            <Location
              id={selectedEntity.id}
              location={selectedEntity.location}
            />
          )}
          {/* {selectedEntity.appearance?.meshType === "sphere" && (
            <Glow
              id={selectedEntity.id}
              glow={selectedEntity.glow || undefined}
            />
          )} */}
          {selectedEntity.appearance?.meshType === "sphere" && (
            <Light
              id={selectedEntity.id}
              light={selectedEntity.light || undefined}
            />
          )}
          {selectedEntity.stageChild && (
            <Systems
              id={selectedEntity.id}
              enginesImpulse={selectedEntity.enginesImpulse || undefined}
              enginesWarp={selectedEntity.enginesWarp || undefined}
              thrusters={selectedEntity.thrusters || undefined}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPalette;

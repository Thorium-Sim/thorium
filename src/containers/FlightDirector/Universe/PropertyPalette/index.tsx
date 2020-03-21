import React from "react";
import {Entity} from "generated/graphql";
import Identity from "./Identity";
import Appearance from "./Appearance";
import Location from "./Location";
import Template from "./Template";
import Glow from "./Glow";
import "../styles.scss";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import Light from "./Light";

interface PropertyPaletteProps {
  selectedEntity: Entity | undefined;
}
const PropertyPalette: React.FC<PropertyPaletteProps> = ({selectedEntity}) => {
  const [getAsset, setGetAsset] = React.useState<{
    label: string;
    current: string;
    dir: string;
    cb: Function;
  } | null>(null);
  if (getAsset) {
    return (
      <>
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
      </>
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
          {selectedEntity.appearance?.meshType === "sphere" && (
            <Glow
              id={selectedEntity.id}
              glow={selectedEntity.glow || undefined}
            />
          )}
          {selectedEntity.appearance?.meshType === "sphere" && (
            <Light
              id={selectedEntity.id}
              light={selectedEntity.light || undefined}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPalette;

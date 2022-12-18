import React from "react";
import Sidebar from "./sidebar";
import Bottom from "./bottom";
import Preview from "./preview";
import {useParams} from "react-router-dom";
import {
  useTacticalMapUpdateSubscription,
  useRemoveTacticalItemMutation,
  useRemoveTacticalPathMutation,
  useUpdateTacticalItemMutation,
  useUpdateTacticalPathMutation,
} from "generated/graphql";
import "./style.scss";

interface TacticalMapCoreProps {
  viewscreen?: boolean;
  simulator?: any;
  dedicated?: boolean;
}

const TacticalMapCore: React.FC<TacticalMapCoreProps> = ({
  viewscreen,
  simulator,
  dedicated,
}) => {
  const [tacticalMapId, setTacticalMapId] = React.useState<string | null>(null);
  const [layerId, setLayerId] = React.useState<string | null>(null);
  const [objectId, setObjectId] = React.useState<string | null>(null);
  const [speed, setSpeed] = React.useState<number>(1000);

  const {flightId} = useParams();

  const [removeTacticalItemMutation] = useRemoveTacticalItemMutation();
  const [removeTacticalPathMutation] = useRemoveTacticalPathMutation();
  const [updateTacticalItemMutation] = useUpdateTacticalItemMutation();
  const [updateTacticalPathMutation] = useUpdateTacticalPathMutation();

  const {data} = useTacticalMapUpdateSubscription({
    variables: {id: tacticalMapId || ""},
    skip: !tacticalMapId,
  });
  const tacticalMap = data?.tacticalMapUpdate;

  const selectTactical = (tacticalMapId: string) => {
    setTacticalMapId(tacticalMapId);
    setLayerId(null);
    setObjectId(null);
  };
  const selectLayer = (layerId: string) => {
    setLayerId(layerId);
    setObjectId(null);
  };
  const selectObject = (object: any) => {
    if (object) {
      setLayerId(object.layerId);
      setObjectId(object.id);
    } else {
      setObjectId(null);
    }
  };
  const updateObject = (
    key: string,
    value: any,
    object: any,
    speed?: string,
  ) => {
    if (!tacticalMapId) return;

    const variables = {
      mapId: tacticalMapId,
      layerId: object ? object.layerId : layerId,
      item: {
        id: object ? object.id : objectId,
        [key]:
          value === true
            ? true
            : value === false
            ? false
            : isNaN(Number(value))
            ? value
            : Number(value),
      },
    };
    if (speed) {
      variables.item.speed = parseFloat(speed);
    }

    updateTacticalItemMutation({variables});
  };
  const removeObject = (objectIdInput: string, layerIdInput: string) => {
    const layerIdVar = layerIdInput || layerId;
    const objectIdVar = objectIdInput || objectId;
    if (!tacticalMapId || !layerIdVar || !objectIdVar) return;
    const variables = {
      mapId: tacticalMapId,
      layerId: layerIdVar,
      itemId: objectIdVar,
    };
    setObjectId(null);
    removeTacticalItemMutation({variables});
  };
  const updatePath = (key: string, value: any, object: any) => {
    if (!tacticalMapId) return;
    const variables = {
      mapId: tacticalMapId,
      layerId: object ? object.layerId : layerId,
      path: {
        id: object ? object.id : objectId,
        [key]: value,
      },
    };
    updateTacticalPathMutation({variables});
  };
  const removePath = (pathId: string) => {
    if (!tacticalMapId || !layerId || !pathId) return;
    const variables = {
      mapId: tacticalMapId,
      layerId: layerId,
      pathId: pathId,
    };
    removeTacticalPathMutation({variables});
  };

  return (
    <div className="tacticalmap-core">
      <div className="preview">
        {tacticalMap && (
          <Preview
            simulatorId={simulator ? simulator.id : null}
            interval={tacticalMap.interval}
            viewscreen={viewscreen}
            tacticalMapId={tacticalMapId}
            layers={tacticalMap.layers}
            layerId={layerId}
            selectObject={selectObject}
            objectId={objectId}
            updateObject={updateObject}
            updatePath={updatePath}
            removePath={removePath}
            speed={speed}
            core={true}
          />
        )}
      </div>
      <div className="right-sidebar">
        <Sidebar
          flightId={flightId}
          tacticalMapId={tacticalMapId || undefined}
          tacticalMap={tacticalMap || undefined}
          layerId={layerId || undefined}
          selectTactical={selectTactical}
          selectLayer={selectLayer}
          deselectTactical={() => setTacticalMapId(null)}
          dedicated={dedicated}
        />
      </div>
      <div className="bottom-bar">
        <Bottom
          speed={speed}
          updateSpeed={(s: number) => setSpeed(s)}
          tacticalMapId={tacticalMapId || ""}
          tacticalMap={tacticalMap || undefined}
          layerId={layerId || ""}
          objectId={objectId || ""}
          updateObject={updateObject}
          removeObject={removeObject}
        />
      </div>
    </div>
  );
};

export default TacticalMapCore;

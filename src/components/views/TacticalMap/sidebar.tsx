import React from "react";
import {Button} from "helpers/reactstrap";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import TacticalMapList from "./tacticalMapList";
import {
  useFreezeTacticalMapMutation,
  useNewLayerMutation,
  useRemoveLayerMutation,
  useReorderTacticalLayerMutation,
  TacticalMap,
} from "generated/graphql";

type Item = {id: string; name: string};
const SortableItem = SortableElement(
  ({
    item,
    selectedLayer,
    selectLayer,
  }: {
    item: Item;
    selectedLayer?: string;
    selectLayer: Function;
  }) => (
    <li
      onMouseDown={() => selectLayer(item)}
      className={`${
        item.id === selectedLayer ? "selected" : ""
      } list-group-item`}
    >
      {item.name}
    </li>
  ),
);

const SortableList = SortableContainer(
  ({
    items,
    selectedLayer,
    selectLayer,
  }: {
    items: Item[];
    selectedLayer?: string;
    selectLayer: Function;
  }) => {
    return (
      <ul style={{padding: 0}}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={`${item.id}-layer`}
              index={index}
              item={item}
              selectedLayer={selectedLayer}
              selectLayer={selectLayer}
            />
          );
        })}
      </ul>
    );
  },
);

interface SidebarProps {
  tacticalMapId?: string;
  layerId?: string;
  tacticalMap?: TacticalMap;
  selectTactical: Function;
  deselectTactical: Function;
  selectLayer: Function;
  flightId?: string;
  dedicated?: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  tacticalMapId,
  layerId,
  tacticalMap,
  selectTactical,
  deselectTactical,
  selectLayer,
  flightId,
  dedicated,
}) => {
  const [addLayerMutation] = useNewLayerMutation();
  const [removeLayerMutation] = useRemoveLayerMutation();
  const [freezeMutation] = useFreezeTacticalMapMutation();
  const [reorderMutation] = useReorderTacticalLayerMutation();

  const addLayer = () => {
    const name = prompt("What is the name of the new layer?");
    if (name && tacticalMapId) {
      addLayerMutation({variables: {mapId: tacticalMapId, name}});
    }
  };
  const removeLayer = (layerIdInput?: string) => {
    const layerIdVal =
      typeof layerIdInput === "string" ? layerIdInput : layerId;
    if (!tacticalMapId || !layerIdVal) return;
    selectLayer(null);
    removeLayerMutation({
      variables: {
        mapId: tacticalMapId,
        layerId: layerIdVal,
      },
    });
  };
  const clearTactical = () => {
    if (
      window.confirm(
        "This will remove all layers. Are you sure you want to do this?",
      )
    ) {
      tacticalMap?.layers?.forEach(l => l?.id && removeLayer(l.id));
    }
  };
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const layer = tacticalMap?.layers?.[oldIndex]?.id;
      if (!layer || !tacticalMapId) return;
      reorderMutation({
        variables: {
          mapId: tacticalMapId,
          layer,
          order: newIndex,
        },
      });
    }
  };
  const freezeTactical = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!tacticalMapId) return;
    freezeMutation({
      variables: {
        id: tacticalMapId,
        freeze: evt.target.checked,
      },
    });
  };
  return (
    <div>
      <TacticalMapList
        flightId={flightId}
        tacticalMapId={tacticalMapId}
        selectTactical={selectTactical}
        deselectTactical={deselectTactical}
        dedicated={Boolean(dedicated)}
      />

      {tacticalMapId && tacticalMap && (
        <div>
          <h3>{tacticalMap.name}</h3>
          <p>Layers</p>
          <div className="layer-list">
            <SortableList
              items={tacticalMap.layers as Item[]}
              onSortEnd={onSortEnd}
              selectedLayer={layerId}
              selectLayer={(l: {id: string}) => selectLayer(l.id)}
            />
          </div>

          <Button color="success" size="sm" onClick={addLayer}>
            Add Layer
          </Button>
          <Button
            color="warning"
            size="sm"
            onClick={removeLayer}
            disabled={!layerId}
          >
            Remove Layer
          </Button>
          <Button color="danger" size="sm" onClick={clearTactical}>
            Clear Tactical
          </Button>
          <label>
            <input
              type="checkbox"
              checked={Boolean(tacticalMap.frozen)}
              onChange={freezeTactical}
            />{" "}
            Frozen
          </label>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

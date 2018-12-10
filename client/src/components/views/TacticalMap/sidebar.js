import React, { Component } from "react";
import { Button } from "reactstrap";
import gql from "graphql-tag";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import TacticalMapList from "./tacticalMapList";

const SortableItem = SortableElement(({ item, selectedLayer, selectLayer }) => (
  <li
    onMouseDown={() => selectLayer(item)}
    className={`${item.id === selectedLayer ? "selected" : ""} list-group-item`}
  >
    {item.name}
  </li>
));

const SortableList = SortableContainer(
  ({ items, selectedLayer, selectLayer }) => {
    return (
      <ul style={{ padding: 0 }}>
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
  }
);

export default class Sidebar extends Component {
  addLayer = () => {
    const name = prompt("What is the name of the new layer?");
    if (name) {
      const mutation = gql`
        mutation NewLayer($mapId: ID!, $name: String!) {
          addTacticalMapLayer(mapId: $mapId, name: $name)
        }
      `;
      const variables = { mapId: this.props.tacticalMapId, name };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  removeLayer = layerId => {
    const mutation = gql`
      mutation RemoveLayer($mapId: ID!, $layerId: ID!) {
        removeTacticalMapLayer(mapId: $mapId, layerId: $layerId)
      }
    `;
    const variables = {
      mapId: this.props.tacticalMapId,
      layerId: typeof layerId === "string" ? layerId : this.props.layerId
    };
    this.props.selectLayer(null);
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  clearTactical = () => {
    if (
      window.confirm(
        "This will remove all layers. Are you sure you want to do this?"
      )
    ) {
      const { tacticalMap } = this.props;
      tacticalMap.layers.forEach(l => this.removeLayer(l.id));
    }
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const mutation = gql`
        mutation ReorderTacticalLayer($mapId: ID!, $layer: ID!, $order: Int!) {
          reorderTacticalMapLayer(mapId: $mapId, layer: $layer, order: $order)
        }
      `;
      const { tacticalMap } = this.props;

      const variables = {
        mapId: this.props.tacticalMapId,
        layer: tacticalMap.layers[oldIndex].id,
        order: newIndex
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  freezeTactical = evt => {
    const { tacticalMapId } = this.props;
    const mutation = gql`
      mutation FreezeTacticalMap($id: ID!, $freeze: Boolean!) {
        freezeTacticalMap(id: $id, freeze: $freeze)
      }
    `;
    const variables = {
      id: tacticalMapId,
      freeze: evt.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      tacticalMapId,
      layerId,
      tacticalMap,
      selectTactical,
      deselectTactical,
      selectLayer,
      flightId,
      dedicated
    } = this.props;
    return (
      <div>
        <TacticalMapList
          flightId={flightId}
          tacticalMapId={tacticalMapId}
          selectTactical={selectTactical}
          deselectTactical={deselectTactical}
          dedicated={dedicated}
          client={this.props.client}
        />

        {tacticalMapId &&
          tacticalMap && (
            <div>
              <h3>{tacticalMap.name}</h3>
              <p>Layers</p>
              <div className="layer-list">
                <SortableList
                  items={tacticalMap.layers}
                  onSortEnd={this.onSortEnd}
                  selectedLayer={layerId}
                  selectLayer={l => selectLayer(l.id)}
                />
              </div>

              <Button color="success" size="sm" onClick={this.addLayer}>
                Add Layer
              </Button>
              <Button
                color="warning"
                size="sm"
                onClick={this.removeLayer}
                disabled={!layerId}
              >
                Remove Layer
              </Button>
              <Button color="danger" size="sm" onClick={this.clearTactical}>
                Clear Tactical
              </Button>
              <label>
                <input
                  type="checkbox"
                  checked={tacticalMap.frozen}
                  onChange={this.freezeTactical}
                />{" "}
                Frozen
              </label>
            </div>
          )}
      </div>
    );
  }
}

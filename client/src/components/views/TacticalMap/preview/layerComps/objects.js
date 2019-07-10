import React from "react";
import TacticalIcon from "./TacticalIcon";
import Selection from "./select";
import useInterpolate from "../../../CrmFighter/fighterCanvas/useInterpolate";
import useInterval from "helpers/hooks/useInterval";

const Objects = ({
  id,
  items,
  speed,
  selectObject,
  objectId,
  opacity,
  updateObject,
  removeObject,
  core,
  interval
}) => {
  const [selected, setSelected] = React.useState([]);
  const [movements, setMovements] = React.useState({});
  const selectionChange = selectedChildren => {
    setSelected(Object.keys(selectedChildren).filter(c => selectedChildren[c]));
  };
  const [flash, setFlash] = React.useState(false);
  useInterval(
    () => {
      setFlash(flash => !flash);
    },
    flash ? 250 : 500
  );

  const moveMultiple = (evt, bounds) => {
    const canvasEl = document.getElementById(`tactical-objects-${id}`);
    const canvasBounds = canvasEl.getBoundingClientRect();
    if (evt === "cancel") {
      Object.keys(movements).forEach(m => {
        const item = items.find(i => i.id === m);
        if (!item) return;
        let { x, y, z } = item.destination;
        const movement = movements[m];
        x = x + movement.x;
        y = y + movement.y;

        const el = document.getElementById(`tactical-icon-${item.id}`);
        const elBounds = el.getBoundingClientRect();
        const leftBound =
          (-1 * (elBounds.width / item.size + canvasBounds.left)) /
          canvasBounds.width;
        const rightBound = 1 + 20 / canvasBounds.width;
        const topBound =
          (-1 * (elBounds.height / item.size + canvasBounds.top)) /
          canvasBounds.height;
        const bottomBound = 1 + 20 / canvasBounds.height;
        if (
          x > rightBound ||
          x < leftBound ||
          y > bottomBound ||
          y < topBound
        ) {
          removeObject();
        } else {
          updateObject("destination", { x, y, z }, item, speed);
        }
      });
      setMovements({});
    } else {
      const x = evt.movementX / bounds.width;
      const y = evt.movementY / bounds.height;
      setMovements(movements =>
        selected.reduce((prev, next) => {
          if (!movements[next]) {
            prev[next] = { x, y, z: 0 };
          } else {
            prev[next] = {
              x: movements[next].x + x,
              y: movements[next].y + y,
              z: 0
            };
          }
          return prev;
        }, {})
      );
    }
  };
  const contacts = React.useMemo(
    () => items.map(i => ({ ...i, position: i.location })),
    [items]
  );
  return (
    <div
      className="tactical-objects"
      id={`tactical-objects-${id}`}
      style={{ opacity }}
    >
      <Selection onSelectionChange={selectionChange}>
        {contacts.map(i => (
          <TacticalIcon
            key={i.id}
            layerId={id}
            {...i}
            interval={interval}
            core={core}
            moveMultiple={selected.length ? moveMultiple : () => {}}
            movement={movements[i.id]}
            location={i.position}
            flashing={flash}
            selectObject={selectObject}
            objectId={objectId}
            updateObject={updateObject}
            removeObject={removeObject}
          />
        ))}
      </Selection>
    </div>
  );
};
export default Objects;

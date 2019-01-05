import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";

const sortableElement = SortableElement;
const sortableContainer = SortableContainer;

const SortableItem = sortableElement(({ item, selected, select, remove }) => (
  <li
    onClick={() => select(item.id)}
    className={`${item.id === selected ? "selected" : ""} list-group-item`}
  >
    {item.name}{" "}
    {remove && (
      <FontAwesome
        name="ban"
        className="text-danger"
        onClick={() => remove(item.id)}
      />
    )}
  </li>
));

const SortableList = sortableContainer(
  ({ items, select, remove, selected }) => {
    return (
      <ul style={{ padding: 0 }}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={item.id}
              index={index}
              item={item}
              selected={selected}
              select={select}
              remove={remove}
            />
          );
        })}
      </ul>
    );
  }
);

export default SortableList;

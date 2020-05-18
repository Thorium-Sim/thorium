import React from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {ListGroup, ListGroupItem} from "reactstrap";
import {FaBan} from "react-icons/fa";

const SortableItem = SortableElement(
  ({
    item,
    selectedItem,
    setSelectedItem,
    remove,
  }: {
    item: {name: string; id: string};
    selectedItem?: string | null;
    setSelectedItem: (id: string) => void;
    remove?: (id: string) => void;
  }) => (
    <ListGroupItem
      onClick={() => setSelectedItem(item.id)}
      active={item.id === selectedItem}
    >
      {item.name}
      {remove && (
        <FaBan className="text-danger" onClick={() => remove(item.id)} />
      )}
    </ListGroupItem>
  ),
);

const SortableList = SortableContainer(
  ({
    items,
    setSelectedItem,
    selectedItem,
    removeItem,
    ...props
  }: {
    items: {name: string; id: string}[];
    setSelectedItem: (id: string) => void;
    selectedItem?: string | null;
    removeItem?: (id: string) => void;
  }) => {
    return (
      <ListGroup {...props}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={item.id}
              index={index}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              remove={removeItem}
            />
          );
        })}
      </ListGroup>
    );
  },
);

export default SortableList;

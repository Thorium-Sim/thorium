import React from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {ListGroup, ListGroupItem} from "reactstrap";

const SortableButton = SortableElement(
  ({
    button,
    selectedButton,
    setSelectedButton,
  }: {
    button: {id: string; name: string; category: string};
    selectedButton?: string | null;
    setSelectedButton: (id: string) => void;
  }) => (
    <ListGroupItem
      key={`${button.id}`}
      onClick={() => setSelectedButton(button.id)}
      active={button.id === selectedButton}
    >
      {button.name}
      <br />
      <small>{button.category}</small>
    </ListGroupItem>
  ),
);

const SortableButtonList = SortableContainer(
  ({
    id,
    selectedButton,
    setSelectedButton,
    buttons,
    onSortEnd,
    ...props
  }: {
    id: string;
    selectedButton?: string | null;
    setSelectedButton: (id: string) => void;
    buttons: {id: string; name: string; category: string}[];
    onSortEnd: (newIndex: number) => void;
  }) => {
    return (
      <ListGroup style={{maxHeight: "60vh", overflowY: "auto"}} {...props}>
        {buttons.map((b, index) => (
          <SortableButton
            key={b.id}
            index={index}
            button={b}
            selectedButton={selectedButton}
            setSelectedButton={() => setSelectedButton(b.id)}
          />
        ))}
      </ListGroup>
    );
  },
);

export default SortableButtonList;

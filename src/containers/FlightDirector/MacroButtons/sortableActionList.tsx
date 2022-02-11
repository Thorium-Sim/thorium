import React from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {ListGroup, ListGroupItem} from "reactstrap";
import EventName from "../MissionConfig/EventName";
import {FaBan} from "react-icons/fa";

const SortableAction = SortableElement(
  ({
    id,
    event,
    selectedAction,
    setSelectedAction,
    removeAction,
  }: {
    id: string;
    event: {id: string; event: string};
    selectedAction?: string | null;
    setSelectedAction: (id: string) => void;
    removeAction: (id: string) => void;
  }) => (
    <ListGroupItem
      key={`${id}-${event.id}`}
      onClick={() => setSelectedAction(event.id)}
      active={event.id === selectedAction}
    >
      <EventName id={event.event} />{" "}
      <FaBan
        className="text-danger pull-right"
        onClick={() => removeAction(event.id)}
      />
    </ListGroupItem>
  ),
);

const SortableActionList = SortableContainer(
  ({
    id,
    selectedAction,
    setSelectedAction,
    removeAction,
    actions,
    onSortEnd,
    ...props
  }: {
    id: string;
    selectedAction?: string | null;
    setSelectedAction: (id: string) => void;
    removeAction: (id: string) => void;
    actions: {id: string; event: string}[];
    onSortEnd: (newIndex: number) => void;
  }) => {
    return (
      <ListGroup style={{maxHeight: "60vh", overflowY: "auto"}} {...props}>
        {actions.map((e, index) => (
          <SortableAction
            key={e.id}
            index={index}
            id={id}
            event={e}
            selectedAction={selectedAction}
            setSelectedAction={() => setSelectedAction(e.id)}
            removeAction={() => removeAction(e.id)}
          />
        ))}
      </ListGroup>
    );
  },
);

export default SortableActionList;

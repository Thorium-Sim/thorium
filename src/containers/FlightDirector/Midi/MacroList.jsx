import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";
import {FaBan} from "react-icons/fa";
import EventPicker from "../MissionConfig/EventPicker";
import EventName from "../MissionConfig/EventName";
import uuid from "uuid";

const MacroList = ({
  type,
  actions = [],
  setMidiControl,
  selectedAction,
  setSelectedAction,
}) => {
  function addAction(e) {
    const {value: event} = e.target;
    setMidiControl(({config}) => {
      const macroKey = type === "down" ? "macros" : "upMacros";
      const macros = config[macroKey] || [];
      return {
        config: {...config, [macroKey]: macros.concat({id: uuid.v4(), event})},
      };
    });
  }
  function removeAction(id) {
    setMidiControl(({config}) => {
      const macroKey = type === "down" ? "macros" : "upMacros";
      const macros = config[macroKey] || [];
      return {config: {...config, [macroKey]: macros.filter(m => m.id !== id)}};
    });
  }
  return (
    <>
      <h4>{type === "up" ? "Button Down Macros" : "Button Up Macros"}</h4>
      <ListGroup className="scroll">
        {actions.map(e => {
          return (
            <ListGroupItem
              active={e.id === selectedAction}
              key={e.id}
              onClick={() => setSelectedAction(e.id)}
            >
              <EventName id={e.event} label={e.event} />{" "}
              <FaBan
                className="text-danger pull-right"
                onClick={evt => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  removeAction(e.id);
                }}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <EventPicker
        className={"btn btn-sm btn-success btn-block"}
        handleChange={e => addAction(e)}
      />
    </>
  );
};
export default MacroList;

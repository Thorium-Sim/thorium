import React from "react";
import {useEventNames} from "./EventPicker";
const EventName = ({id, label}: {id: string; label?: string}) => {
  const events = useEventNames();
  const eventName = events.find(e => e.name === id)?.description;
  return <span>{eventName || label || id}</span>;
};

export default EventName;

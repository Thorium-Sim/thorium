import React from "react";
import {useMidi} from "helpers/midi";

function Slider({
  channel = 0,
  messageType = "controlchange",
  controllerNumber,
  value,
  setValue,
}) {
  const {addSubscriber, sendOutput} = useMidi();
  const selfTriggeredRef = React.useRef(false);
  React.useEffect(() => {
    return addSubscriber(
      {
        channel,
        messageType,
        controllerNumber,
        name: "BCF2000 Port 1",
      },
      ({value: val}) => {
        selfTriggeredRef.current = true;
        setValue(val);
      },
    );
  }, [addSubscriber, channel, controllerNumber, messageType, setValue]);

  React.useEffect(() => {
    if (selfTriggeredRef.current) {
      selfTriggeredRef.current = false;
      return;
    }
    sendOutput({
      name: "BCF2000 Port 1",
      messageType,
      controllerNumber,
      value: value,
    });
  }, [value, controllerNumber, messageType, sendOutput]);

  return null;
}

export default Slider;

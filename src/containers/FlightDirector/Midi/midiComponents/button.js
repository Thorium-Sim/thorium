import React from "react";
import {useMidi} from "helpers/midi";

function Button({
  channel = 0,
  messageType = "controlchange",
  controllerNumber,
  value,
  setValue,
}) {
  const {addSubscriber, sendOutput} = useMidi();
  React.useEffect(() => {
    return addSubscriber(
      {
        channel,
        messageType,
        controllerNumber,
        name: "BCF2000 Port 1",
      },
      ({value: val}) => {
        setValue(val);
      },
    );
  }, [addSubscriber, channel, controllerNumber, messageType, setValue]);

  React.useEffect(() => {
    sendOutput({
      name: "BCF2000 Port 1",
      messageType,
      controllerNumber,
      value: value,
    });
  }, [value, controllerNumber, messageType, sendOutput]);

  return null;
}

export default Button;

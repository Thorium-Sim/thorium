import React from "react";
import {useWebRTCContext} from "components/client/WebRTC";
import {Button} from "reactstrap";

const WebRTC = () => {
  const {activate, activated} = useWebRTCContext();
  if (activated) return <div>Activated</div>;
  return (
    <div>
      <Button color="success" block onClick={activate}>
        Activate Remote Audio
      </Button>
    </div>
  );
};
export default WebRTC;

import React from "react";
import {Button} from "helpers/reactstrap";
import Torpedo from "./torpedo";

const TorpedoTube = ({
  torpedoState,
  torpedoType,
  updateScreen,
  unloadTorpedo,
  fireTorpedo,
  enabled,
  targeting,
}) => {
  return (
    <div>
      <div className="torpedoButton">
        {torpedoState === "idle" ? (
          <Button
            block
            color="info"
            disabled={!enabled}
            onClick={() => updateScreen("TorpedoPick")}
          >
            Load Torpedo
          </Button>
        ) : (
          <div>
            <Button
              block
              color="warning"
              disabled={!enabled}
              onClick={unloadTorpedo}
            >
              Unload {torpedoType === "probe" ? "Probe" : Torpedo}
            </Button>
            {targeting && (
              <Button
                block
                color="danger"
                disabled={!enabled}
                onClick={fireTorpedo}
              >
                Fire {torpedoType === "probe" ? "Probe" : Torpedo}
              </Button>
            )}
          </div>
        )}
      </div>
      <Torpedo state={torpedoState} type={torpedoType} />
      <img
        alt="torpedo"
        role="presentation"
        className="torpedoImage"
        draggable="false"
        src={require("./torpedo.svg")}
      />
    </div>
  );
};

export default TorpedoTube;

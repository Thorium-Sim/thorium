import React from "react";
import { Button } from "reactstrap";
import Torpedo from "./torpedo";
import Transitioner from "./transitioner";

export default class TorpedoTube extends Transitioner {
  render() {
    const {
      torpedoState,
      torpedoType,
      updateScreen,
      unloadTorpedo,
      fireTorpedo,
      enabled,
      targeting
    } = this.props;
    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <div className="torpedoButton">
          {torpedoState === "idle" ? (
            <Button
              block
              color="info"
              disabled={!enabled}
              onClick={updateScreen.bind(this, "TorpedoPick")}
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
                Unload Torpedo
              </Button>
              {targeting && (
                <Button
                  block
                  color="danger"
                  disabled={!enabled}
                  onClick={fireTorpedo}
                >
                  Fire Torpedo
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
  }
}

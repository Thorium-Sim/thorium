import React from "react";
import { Button } from "reactstrap";
import Transitioner from "./transitioner";

export default class TorpedoPick extends Transitioner {
  render() {
    const torpedoWidth = 120;
    const { updateScreen, loadTorpedo, inventory } = this.props;
    const types = inventory.reduce((prev, next) => {
      if (prev[next.type]) {
        prev[next.type] += 1;
      } else {
        prev[next.type] = 1;
      }
      return prev;
    }, {});

    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <div className="torpedoPickScroll">
          <div
            className="torpedoPicker"
            style={{ width: Object.keys(types).length * torpedoWidth }}
          >
            {Object.keys(types).map((t, i) => {
              let imgKey = t;

              if (["photon", "quantum", "probe"].indexOf(imgKey) < 0) {
                imgKey = "other";
              }
              const img = require(`./torpedos/${imgKey}.svg`);
              return (
                <div
                  key={t + i}
                  onClick={loadTorpedo.bind(
                    this,
                    (inventory.find(inv => inv.type === t) || {}).id
                  )}
                  className="torpedoPick"
                  style={{ width: torpedoWidth }}
                >
                  <img
                    alt="torpedo"
                    draggable="false"
                    role="presentation"
                    src={img}
                  />
                  <span style={{ textTransform: "capitalize" }}>
                    {t} ({types[t]})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          block
          color="warning"
          onClick={updateScreen.bind(this, "TorpedoTube")}
        >
          Cancel
        </Button>
      </div>
    );
  }
}

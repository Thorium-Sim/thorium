import React from "react";
import { Button } from "helpers/reactstrap";
import Transitioner from "./transitioner";

const images = {
  photon: require(`./torpedos/photon.svg`),
  quantum: require(`./torpedos/quantum.svg`),
  probe: require(`./torpedos/probe.svg`),
  other: require("./torpedos/other.svg")
};

export default class TorpedoPick extends Transitioner {
  render() {
    const torpedoWidth = 300;
    const { updateScreen, loadTorpedo, inventory } = this.props;
    const types = inventory.reduce((prev, next) => {
      if (next.probe) {
        prev[next.probe.id] = 1;
      } else if (prev[next.type]) {
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
              let name = t;
              let id = null;
              if (!images[imgKey]) {
                imgKey = "other";
              }
              if (imgKey === "other") {
                const probe = inventory.find(i => i.probe && i.probe.id === t);
                if (probe) {
                  imgKey = "probe";
                  name = `Probe: ${probe.probe.name}`;
                  id = probe.id;
                }
              }
              const img = images[imgKey];
              return (
                <div
                  key={t + i}
                  onClick={loadTorpedo.bind(
                    this,
                    id || (inventory.find(inv => inv.type === t) || {}).id
                  )}
                  className="torpedoPick"
                  style={{
                    minWidth: "120px",
                    padding: "0 20px"
                  }}
                >
                  <img
                    alt="torpedo"
                    draggable="false"
                    role="presentation"
                    style={{ width: "60px" }}
                    src={img}
                  />
                  <pre
                    style={{
                      textTransform: "capitalize",
                      textAlign: "center",
                      overflow: "hidden"
                    }}
                  >
                    {name} ({types[t]})
                  </pre>
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

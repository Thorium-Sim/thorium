import React from "react";
import ThreeView from "./three-view";
import "./style.scss";
import useMeasure from "helpers/hooks/useMeasure";
import { ViewscreenScaleContext } from "../../views/Viewscreen";

const ShipModel = props => {
  const {
    viewscreen = { data: "{}" },
    simulator: { assets }
  } = props;
  const data = JSON.parse(viewscreen.data);
  const { title, description } = data;
  const [measureRef, dimensions] = useMeasure();
  const scale = React.useContext(ViewscreenScaleContext);
  return (
    <div
      className={`ship-model-container ${
        title || description ? "has-text" : ""
      }`}
    >
      {(title || description) && (
        <div style={{ width: "40vh" }}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      )}

      <div ref={measureRef} className="three-container">
        {dimensions.width && (
          <ThreeView
            {...data}
            src={`/assets${data.mesh || assets.mesh}`}
            texSrc={"/3D/Texture/Simulator/default.jpg"}
            simulatorId={props.simulator.id}
            dimensions={{
              width: dimensions.width / scale,
              height: dimensions.height / scale
            }}
          />
        )}
      </div>
    </div>
  );
};
export default ShipModel;

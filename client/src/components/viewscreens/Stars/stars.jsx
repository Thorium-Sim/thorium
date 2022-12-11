import React from "react";
import ThreeView from "./threeView";
import useMeasure from "helpers/hooks/useMeasure";
import {ViewscreenScaleContext} from "../../cards/Viewscreen";

const Stars = props => {
  let angle = 0;
  try {
    angle =
      ((parseInt(JSON.parse(props.viewscreen.data).angle) || null) ??
        localStorage.getItem("thorium_stars_angle")) ||
      0;
  } catch {
    // Do nothing
  }
  React.useEffect(() => {
    localStorage.setItem("thorium_stars_angle", angle);
  }, [angle]);
  const [velocity, setVelocity] = React.useState(
    props.activating ? 0 : props.velocity,
  );
  React.useEffect(() => {
    if (props.activating) {
      setTimeout(() => {
        setVelocity(props.velocity);
      }, 1000);
    } else {
      setVelocity(props.velocity);
    }
  }, [props.activating, props.velocity]);

  const [measureRef, dimensions] = useMeasure();
  const scale = React.useContext(ViewscreenScaleContext);
  return (
    <div className="stars" style={{background: "black"}}>
      <div
        id="three-container"
        ref={measureRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {dimensions.width && (
          <ThreeView
            {...{
              width: dimensions.width / scale,
              height: dimensions.height / scale,
            }}
            angle={angle}
            velocity={velocity}
          />
        )}
      </div>
    </div>
  );
};
export default Stars;

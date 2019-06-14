import React from "react";
import ThreeView from "./threeView";
import useMeasure from "helpers/hooks/useMeasure";
import { ViewscreenScaleContext } from "../../views/Viewscreen";

const Stars = props => {
  const [velocity, setVelocity] = React.useState(
    props.activating ? 0 : props.velocity
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
  console.log(props.activating, props.velocity, velocity);

  const [measureRef, dimensions] = useMeasure();
  const scale = React.useContext(ViewscreenScaleContext);
  return (
    <div className="stars" style={{ background: "black" }}>
      <div
        id="three-container"
        ref={measureRef}
        style={{
          width: "100vw",
          height: "100vh"
        }}
      >
        {dimensions.width && (
          <ThreeView
            {...{
              width: dimensions.width / scale,
              height: dimensions.height / scale
            }}
            velocity={velocity}
          />
        )}
      </div>
    </div>
  );
};
export default Stars;

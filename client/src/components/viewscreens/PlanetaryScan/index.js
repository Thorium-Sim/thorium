import React from "react";
import ThreeView from "./threeView";
import "./style.scss";
import useMeasure from "helpers/hooks/useMeasure";
import { ViewscreenScaleContext } from "../../views/Viewscreen";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  return <RenderSphere {...data} />;
};

const RenderSphere = props => {
  const { text } = props;
  const [measureRef, dimensions] = useMeasure();
  const scale = React.useContext(ViewscreenScaleContext);
  return (
    <div className="planetary-scan">
      <div className="scannerBox" ref={measureRef}>
        <div className="scannerBar" />
        {dimensions.width && (
          <ThreeView
            {...props}
            dimensions={{
              width: dimensions.width / scale,
              height: dimensions.height / scale
            }}
          />
        )}
      </div>
      <div className="text-box">{text}</div>
    </div>
  );
};

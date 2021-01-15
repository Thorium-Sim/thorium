import React from "react";
const StarsConfig = ({data, updateData, simple}) => (
  <div>
    <label>Viewport Angle</label>
    <input
      onChange={evt =>
        updateData(
          JSON.stringify({...JSON.parse(data), angle: evt.target.value}),
        )
      }
      defaultValue={JSON.parse(data).angle}
    />
    <p>
      <small>
        This is the yaw angle which the viewscreen is looking out in degrees. If
        this is left blank, or if the viewscreen automatically changes to stars,
        the last used number will be used.
      </small>
    </p>
  </div>
);

export default StarsConfig;

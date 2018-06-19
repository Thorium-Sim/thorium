import React from "react";
import FileExplorer from "./fileExplorer";
import { Row, Col } from "reactstrap";

export default ({ selectedLayer, updateLayer }) => (
  <Row>
    <Col sm={9} style={{ height: "calc(100vh - 42.2vw)" }}>
      <FileExplorer
        directory="/Viewscreen/Videos"
        selectedFiles={[selectedLayer.asset]}
        onClick={(evt, container) => updateLayer("asset", container.fullPath)}
      />
    </Col>
    <Col sm={3}>
      <div>
        <label>
          <input
            checked={selectedLayer.autoplay}
            type="checkbox"
            onChange={evt => updateLayer("autoplay", evt.target.checked)}
          />{" "}
          Autoplay
        </label>
      </div>
      <div>
        <label>
          <input
            checked={selectedLayer.loop}
            type="checkbox"
            onChange={evt => updateLayer("loop", evt.target.checked)}
          />{" "}
          Loop
        </label>
      </div>
      <div>
        <label>
          <input
            checked={selectedLayer.advance}
            type="checkbox"
            onChange={evt => updateLayer("advance", evt.target.checked)}
          />{" "}
          Auto-Advance Mission Timeline on Complete
        </label>
      </div>
      <div>
        <label>
          Playback Speed
          <select
            value={selectedLayer.playbackSpeed || "1"}
            type="select"
            onChange={evt => updateLayer("playbackSpeed", evt.target.value)}
          >
            <option value="0.125">1/8 Speed</option>
            <option value="0.25">1/4 Speed</option>
            <option value="0.5">1/2 Speed</option>
            <option value="0.75">3/4 Speed</option>
            <option value="1">1 Speed</option>
            <option value="1.25">1.25x Speed</option>
            <option value="1.5">1.5x Speed</option>
            <option value="2">2x Speed</option>
            <option value="4">4x Speed</option>
            <option value="8">8x Speed</option>
            <option value="16">16x Speed</option>
          </select>
        </label>
      </div>
    </Col>
  </Row>
);

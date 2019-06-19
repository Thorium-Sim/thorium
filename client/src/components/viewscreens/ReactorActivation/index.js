import React from "react";
import { Container, Row, Col } from "helpers/reactstrap";
import AnimatedNumber from "react-animated-number";
import useMeasure from "helpers/hooks/useMeasure";
import { ViewscreenScaleContext } from "../../views/Viewscreen";

import ReactorModel from "components/views/ReactorControl/model";

const ReactorActivation = props => {
  const data = JSON.parse(props.viewscreen.data);
  const output = parseInt(data.output || data.endOutput || 0, 10);
  const [measureRef, dimensions] = useMeasure();
  const scale = React.useContext(ViewscreenScaleContext);
  return (
    <div style={{ marginTop: "15vh" }}>
      <Container>
        <Row>
          <Col sm={6}>
            <div ref={measureRef} style={{ height: "80vh" }}>
              {dimensions.width && (
                <ReactorModel
                  dimensions={{
                    width: dimensions.width / scale,
                    height: dimensions.height / scale
                  }}
                />
              )}
            </div>
          </Col>
          <Col
            sm={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h1 style={{ fontSize: "60px" }}>
              Reactor Output: <br />
              <AnimatedNumber
                stepPrecision={3}
                value={output}
                duration={5000}
                formatValue={n => `${Math.round(n * 100)}%`}
              />
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ReactorActivation;

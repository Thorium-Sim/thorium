import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Asset } from "../../../helpers/assets";

export default props => {
  const { viewscreen = { data: "{}" } } = props;
  const data = JSON.parse(viewscreen.data);
  return (
    <Container style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col sm={12} style={{ paddingTop: "50px", height: "100%" }}>
          <h1 className="text-center">File Photo:</h1>
          <Asset asset={data.image || ""}>
            {({ src }) => (
              <div
                style={{
                  width: "80%",
                  height: "80%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  margin: "0 auto",
                  backgroundImage: `url(${src})`,
                  borderRadius: "20px",
                  border: "solid 2px rgba(255,255,255,0.5)"
                }}
              />
            )}
          </Asset>
          <h2 className="text-center">{data.name}</h2>
        </Col>
      </Row>
    </Container>
  );
};

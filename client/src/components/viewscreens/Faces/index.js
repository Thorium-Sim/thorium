import React from "react";
import { Container, Row, Col } from "helpers/reactstrap";

export default props => {
  const { viewscreen = { data: "{}" } } = props;
  const data = JSON.parse(viewscreen.data);
  return (
    <Container style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col
          sm={12}
          style={{
            paddingTop: "50px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <h1 className="text-center">File Photo:</h1>
          <div
            style={{
              width: "60%",
              height: "60%",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              margin: "0 auto",
              backgroundImage: `url('/assets${data.image}')`,
              borderRadius: "20px",
              border: "solid 2px rgba(255,255,255,0.5)"
            }}
          />
          <h2 className="text-center">{data.name}</h2>
        </Col>
      </Row>
    </Container>
  );
};

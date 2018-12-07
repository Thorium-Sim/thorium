import React from "react";
import { Row, Col } from "reactstrap";
import { Asset } from "helpers/assets";
import { graphql, withApollo } from "react-apollo";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";

const Thrusters = props => {
  const { simulator, client, data } = props;
  const { assets } = simulator;
  if (data.loading) return null;
  const thruster = data.thrusters[0];
  if (!thruster) return null;
  const thrust = ({ x, y }) => {
    const mutation = gql`
      mutation Thruster($id: ID!, $x: Float, $y: Float) {
        directionUpdate(id: $id, direction: { x: $x, y: $y, z: 0 })
      }
    `;
    const variables = {
      id: thruster.id,
      x,
      y
    };
    client.mutate({
      mutation,
      variables
    });
  };
  return (
    <Row className="jr-thruster">
      <Col sm={12}>
        <Row style={{ height: "auto" }}>
          <Col sm={{ size: 2, offset: 5 }}>
            <FontAwesome
              name="arrow-up"
              size="3x"
              onMouseDown={() => thrust({ x: 0, y: 1 })}
              onMouseUp={() => thrust({ x: 0, y: 0 })}
            />
          </Col>
        </Row>
        <Row style={{ height: "auto" }}>
          <Col sm={12}>
            <div className="center-area">
              <FontAwesome
                name="arrow-left"
                size="3x"
                onMouseDown={() => thrust({ x: -1, y: 0 })}
                onMouseUp={() => thrust({ x: 0, y: 0 })}
              />
              <Asset asset={assets.top}>
                {({ src }) => (
                  <div
                    alt="thruster"
                    draggable="false"
                    style={{
                      backgroundImage: `url('${src}')`,
                      transform: "rotate(-90deg)",
                      width: "200vw",
                      height: "60vh",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      pointerEvents: "none"
                    }}
                  />
                )}
              </Asset>
              <FontAwesome
                name="arrow-right"
                size="3x"
                onMouseDown={() => thrust({ x: 1, y: 0 })}
                onMouseUp={() => thrust({ x: 0, y: 0 })}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ height: "auto" }}>
          <Col sm={{ size: 2, offset: 5 }}>
            <FontAwesome
              name="arrow-down"
              size="3x"
              onMouseDown={() => thrust({ x: 0, y: -1 })}
              onMouseUp={() => thrust({ x: 0, y: 0 })}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const THRUSTER_QUERY = gql`
  query Thrusters($simulatorId: ID) {
    thrusters(simulatorId: $simulatorId) {
      id
    }
  }
`;

export default graphql(THRUSTER_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Thrusters));

import React from "react";
import { Input, Row, Col } from "reactstrap";
import GenericSystemConfig from "./Generic";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const THRUSTER_QUERY = gql`
  query Thruster($id: ID!) {
    thruster(id: $id) {
      id
      rotationSpeed
      movementSpeed
    }
  }
`;

const Thrusters = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={THRUSTER_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const thruster = data.thruster;
          return (
            <Row>
              <Col sm={6}>
                <label>Rotation Speed</label>
                <Mutation
                  mutation={gql`
                    mutation UpdateThrusterRotation($id: ID!, $speed: Float!) {
                      setThrusterRotationSpeed(id: $id, speed: $speed)
                    }
                  `}
                  refetchQueries={[
                    { query: THRUSTER_QUERY, variables: { id } }
                  ]}
                >
                  {action => (
                    <Input
                      type="select"
                      style={{ height: "18px" }}
                      value={thruster.rotationSpeed}
                      onChange={e => {
                        action({
                          variables: { id, speed: e.target.value }
                        });
                      }}
                    >
                      <option value={0}>0</option>
                      <option value={0.2}>0.2</option>
                      <option value={0.5}>0.5</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10 - Fast</option>
                    </Input>
                  )}
                </Mutation>
              </Col>
              <Col sm={6}>
                <label>Movement Speed (Sensors Auto-thrusters)</label>
                <Mutation
                  mutation={gql`
                    mutation UpdateThrusterMovement($id: ID!, $speed: Float!) {
                      setThrusterMovementSpeed(id: $id, speed: $speed)
                    }
                  `}
                  refetchQueries={[
                    { query: THRUSTER_QUERY, variables: { id } }
                  ]}
                >
                  {action => (
                    <Input
                      type="select"
                      style={{ height: "18px" }}
                      value={thruster.movementSpeed}
                      onChange={e => {
                        action({
                          variables: { id, speed: e.target.value }
                        });
                      }}
                    >
                      <option value={0}>0</option>
                      <option value={0.2}>0.2</option>
                      <option value={0.5}>0.5</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10 - Fast</option>
                    </Input>
                  )}
                </Mutation>
              </Col>
            </Row>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Thrusters;

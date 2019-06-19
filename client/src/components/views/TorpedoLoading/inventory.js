import React from "react";
import { Row, Col, Button } from "helpers/reactstrap";
import { OutputField, InputField } from "../../generic/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const UPDATE_COUNT = gql`
  mutation AddWarhead($id: ID!, $type: String!, $count: Int!) {
    torpedoSetWarheadCount(id: $id, warheadType: $type, count: $count)
  }
`;

const ADD_TORPEDO = gql`
  mutation AddWarhead($id: ID!, $type: String) {
    torpedoAddWarhead(id: $id, warhead: { type: $type })
  }
`;

const TorpedoInventory = ({ id, inventory, refetchQueries = [] }) => {
  const types = inventory.reduce(
    (prev, next) => {
      if (prev[next.type]) {
        prev[next.type] += 1;
      } else {
        prev[next.type] = 1;
      }
      return prev;
    },
    { photon: 0, quantum: 0, probe: 0 }
  );
  return (
    <Mutation mutation={UPDATE_COUNT} refetchQueries={refetchQueries}>
      {updateCount => (
        <Row>
          <Col sm={6}>
            <Row style={{ margin: 0 }}>
              <Col sm={6}>Photon:</Col>
              <Col sm={6}>
                <InputField
                  prompt="What is the new value for photon torpedos?"
                  onClick={count =>
                    (parseInt(count, 10) || parseInt(count, 10) === 0) &&
                    updateCount({ variables: { id, type: "photon", count } })
                  }
                >
                  {types.photon}
                </InputField>
              </Col>
              <Col sm={6}>Quantum:</Col>
              <Col sm={6}>
                <InputField
                  prompt="What is the new value for quantum torpedos?"
                  onClick={count =>
                    (parseInt(count, 10) || parseInt(count, 10) === 0) &&
                    updateCount({ variables: { id, type: "quantum", count } })
                  }
                >
                  {types.quantum}
                </InputField>
              </Col>
              <Col sm={6}>Probe:</Col>
              <Col sm={6}>
                <OutputField>{types.probe}</OutputField>
              </Col>
            </Row>
            <Mutation mutation={ADD_TORPEDO} refetchQueries={refetchQueries}>
              {action => (
                <Button
                  block
                  size={"sm"}
                  color={"info"}
                  onClick={() => {
                    const type = prompt(
                      "What type of torpedo do you want to add?"
                    );
                    if (!type) return;
                    action({
                      variables: {
                        id,
                        type
                      }
                    });
                  }}
                >
                  Add Torpedo
                </Button>
              )}
            </Mutation>
          </Col>
          <Col
            sm={6}
            style={{
              position: "relative",
              right: 0,
              height: "100%",
              overflowY: "scroll"
            }}
          >
            <p>Other</p>

            {Object.keys(types)
              .filter(t => ["photon", "quantum", "probe"].indexOf(t) < 0)
              .map(t => {
                return (
                  <Row key={`torpedo-${t}`} style={{ margin: 0 }}>
                    <Col sm={6}>{t}:</Col>
                    <Col sm={6}>
                      <InputField
                        prompt={`What is the new value for ${t} torpedos?`}
                        onClick={count =>
                          (parseInt(count, 10) || parseInt(count, 10) === 0) &&
                          updateCount({ variables: { id, type: t, count } })
                        }
                      >
                        {types[t]}
                      </InputField>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      )}
    </Mutation>
  );
};
export default TorpedoInventory;

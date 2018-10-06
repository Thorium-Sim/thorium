import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { InputField } from "../../generic/core";

class KeypadCore extends Component {
  state = {};
  render() {
    const { keypads } = this.props;
    const { selectedKeypad } = this.state;
    const clients = this.props.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => keypads.find(k => k.id === c.id));
    const keypad = keypads.find(k => k.id === selectedKeypad);
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <ListGroup>
              {clients.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedKeypad}
                  onClick={() => this.setState({ selectedKeypad: c.id })}
                >
                  {c.id}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          {keypad && (
            <Col sm={8}>
              <p>
                <strong>Name:</strong> {keypad.id}
              </p>
              <p>
                <strong>Req. Code:</strong>
                <Mutation
                  mutation={gql`
                    mutation SetCode($id: ID!, $code: [Int!]) {
                      setKeypadCode(id: $id, code: $code)
                    }
                  `}
                >
                  {action => (
                    <InputField
                      style={{ width: "60px", display: "inline-block" }}
                      prompt={`Enter ${
                        keypad.codeLength
                      } numerical digits, or leave blank to pick a random code.`}
                      onClick={value =>
                        action({
                          variables: {
                            id: keypad.id,
                            code: value.split("").map(v => parseInt(v, 10))
                          }
                        })
                      }
                    >
                      {keypad.code.join("")}
                    </InputField>
                  )}
                </Mutation>
              </p>
              <p>
                <strong>Entered Code:</strong> {keypad.enteredCode.join("")}
              </p>
              <p>
                <strong>Allowed Attempts:</strong>
                <Mutation
                  mutation={gql`
                    mutation SetAllowedAttempts($id: ID!, $attempts: Int!) {
                      setKeypadAllowedAttempts(id: $id, attempts: $attempts)
                    }
                  `}
                >
                  {action => (
                    <InputField
                      style={{ width: "60px", display: "inline-block" }}
                      prompt={`Enter the number of allowed attempts. 0 is unlimited.`}
                      onClick={value =>
                        !isNaN(parseInt(value, 10)) &&
                        action({
                          variables: {
                            id: keypad.id,
                            attempts: parseInt(value, 10)
                          }
                        })
                      }
                    >
                      {keypad.allowedAttempts}
                    </InputField>
                  )}
                </Mutation>
              </p>
              <p>
                <strong title="For randomly generated codes.">
                  Code Length:
                </strong>
                <Mutation
                  mutation={gql`
                    mutation SetCodeLength($id: ID!, $len: Int!) {
                      setCodeLength(id: $id, len: $len)
                    }
                  `}
                >
                  {action => (
                    <InputField
                      style={{ width: "60px", display: "inline-block" }}
                      prompt={`Enter the length of randomly generated codes, from 1 to 8.`}
                      onClick={value =>
                        !isNaN(parseInt(value, 10)) &&
                        action({
                          variables: {
                            id: keypad.id,
                            len: parseInt(value, 10)
                          }
                        })
                      }
                    >
                      {keypad.codeLength}
                    </InputField>
                  )}
                </Mutation>
              </p>
              <p>
                <strong>Attempts:</strong> {keypad.attempts}
              </p>
              <p>
                <strong>Hints:</strong>{" "}
                <Mutation
                  mutation={gql`
                    mutation setHint($id: ID!, $hint: Boolean!) {
                      setKeypadHint(id: $id, hint: $hint)
                    }
                  `}
                >
                  {action => (
                    <Input
                      type="checkbox"
                      checked={keypad.giveHints}
                      style={{ margin: 0 }}
                      onChange={e =>
                        action({
                          variables: { id: keypad.id, hint: e.target.checked }
                        })
                      }
                    />
                  )}
                </Mutation>
              </p>
              <p>
                <strong>Locked:</strong>{" "}
                <Mutation
                  mutation={gql`
                    mutation setLocked($id: ID!, $locked: Boolean!) {
                      setKeypadLocked(id: $id, locked: $locked)
                    }
                  `}
                >
                  {action => (
                    <Input
                      type="checkbox"
                      checked={keypad.locked}
                      style={{ margin: 0 }}
                      onChange={e =>
                        action({
                          variables: { id: keypad.id, locked: e.target.checked }
                        })
                      }
                    />
                  )}
                </Mutation>
              </p>
              <p>
                <strong>Remote Access:</strong>{" "}
                <Input type="checkbox" disabled style={{ margin: 0 }} />
              </p>
              <Mutation
                mutation={gql`
                  mutation Reset($id: ID!) {
                    resetKeypad(id: $id)
                  }
                `}
                variables={{ id: keypad.id }}
              >
                {action => (
                  <Button size="sm" color="warning" onClick={action}>
                    Reset
                  </Button>
                )}
              </Mutation>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
export default KeypadCore;

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
import gql from "graphql-tag.macro";
import { InputField } from "../../generic/core";

class KeypadCore extends Component {
  state = { changed: {} };
  componentDidUpdate(prevProps) {
    const { keypads } = this.props;
    const { keypads: oldKeypads } = prevProps;
    const clients = this.props.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => keypads.find(k => k.id === c.id));
    const oldClients = prevProps.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => oldKeypads.find(k => k.id === c.id));
    // If the entered field is different, trigger an update
    const diffs = {};
    clients.forEach(c => {
      const oldClient = oldClients.find(o => c.id === o.id);
      if (oldClient.enteredCode.join("") !== c.enteredCode.join("")) {
        diffs[c.id] = true;
      }
    });
    if (Object.keys(diffs).length > 0) {
      this.setState(state => ({
        changed: { ...state.changed, ...diffs }
      }));
    }
  }
  render() {
    const { keypads } = this.props;
    const { selectedKeypad, changed } = this.state;
    const clients = this.props.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => keypads.find(k => k.id === c.id));
    const keypad = keypads.find(k => k.id === selectedKeypad);
    return clients.length === 0 ? (
      <p>No keypads. Use the Thorium Mobile app to use this core.</p>
    ) : (
      <Container>
        <Row>
          <Col sm={4}>
            <ListGroup>
              {clients.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedKeypad}
                  onClick={() =>
                    this.setState(state => ({
                      selectedKeypad: c.id,
                      changed: { ...state.changed, [c.id]: false }
                    }))
                  }
                  style={{
                    backgroundColor: changed[c.id]
                      ? `rgba(255, 0, 0, 0.3)`
                      : null
                  }}
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
              <div>
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
              </div>
              <p>
                <strong>Entered Code:</strong> {keypad.enteredCode.join("")}
              </p>
              <div>
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
              </div>
              <div>
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
              </div>
              <p>
                <strong>Attempts:</strong> {keypad.attempts}
              </p>
              <div>
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
              </div>
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

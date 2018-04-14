import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import KeyboardList from "./keyboardList";
import KeyboardControl from "./keyboardControl";
const KEYBOARD_QUERY = gql`
  query Keyboards {
    keyboard {
      id
      name
      keys {
        id
        key
        meta
        actions {
          id
          args
          event
          delay
        }
      }
    }
  }
`;
const KEYBOARD_SUB = gql`
  subscription KeyboardsUpdate {
    keyboardUpdate {
      id
      name
      keys {
        id
        key
        meta
        actions {
          id
          args
          event
          delay
        }
      }
    }
  }
`;
const ADD_KEYBOARD = gql`
  mutation AddKeyboard($name: String!) {
    addKeyboard(name: $name)
  }
`;
const REMOVE_KEYBOARD = gql`
  mutation RemoveKeyboard($id: ID!) {
    removeKeyboard(id: $id)
  }
`;
class Keyboards extends Component {
  state = {
    selectedKeyboard: null
  };
  render() {
    const { selectedKeyboard } = this.state;
    return (
      <Query query={KEYBOARD_QUERY}>
        {({ loading, data: { keyboard }, subscribeToMore }) => {
          if (loading) return null;
          return (
            <Container fluid className="survey-forms">
              <Row>
                <Col sm={3}>
                  <Link to={"/"}>Go Back</Link>
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "scroll"
                    }}
                  >
                    <ListGroup>
                      <KeyboardList
                        keyboard={keyboard}
                        selectedKeyboard={selectedKeyboard}
                        selectKeyboard={k =>
                          this.setState({ selectedKeyboard: k })
                        }
                        subscribe={() =>
                          subscribeToMore({
                            document: KEYBOARD_SUB,
                            updateQuery: (prev, { subscriptionData }) => {
                              if (!subscriptionData.data) return prev;
                              return Object.assign({}, prev, {
                                keyboard: subscriptionData.data.keyboardUpdate
                              });
                            }
                          })
                        }
                      />
                    </ListGroup>
                  </div>
                  <Mutation mutation={ADD_KEYBOARD}>
                    {addKeyboard => (
                      <Button
                        color="success"
                        block
                        onClick={() => {
                          const name = prompt(
                            "What is the name of the keyboard?"
                          );
                          name && addKeyboard({ variables: { name } });
                        }}
                      >
                        Create Keyboard
                      </Button>
                    )}
                  </Mutation>

                  {selectedKeyboard && (
                    <Mutation mutation={REMOVE_KEYBOARD}>
                      {removeKeyboard => (
                        <Button
                          color="danger"
                          block
                          onClick={() => {
                            removeKeyboard({
                              variables: { id: selectedKeyboard }
                            });
                            this.setState({ selectedKeyboard: null });
                          }}
                        >
                          Remove Form
                        </Button>
                      )}
                    </Mutation>
                  )}
                </Col>
                <Col sm={9}>
                  {selectedKeyboard && (
                    <KeyboardControl
                      keyboard={keyboard.find(k => k.id === selectedKeyboard)}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Keyboards;

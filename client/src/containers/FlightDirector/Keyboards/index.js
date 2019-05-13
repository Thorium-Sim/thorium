import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Label,
  Input
} from "reactstrap";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
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
const RENAME_KEYBOARD = gql`
  mutation Keybaord($id: ID!, $name: String!) {
    renameKeyboard(id: $id, name: $name)
  }
`;

class Keyboards extends Component {
  state = {
    selectedKeyboard: null
  };
  render() {
    const importKeyboard = evt => {
      if (evt.target.files[0]) {
        const data = new FormData();
        Array.from(evt.target.files).forEach((f, index) =>
          data.append(`files[${index}]`, f)
        );
        fetch(
          `${window.location.protocol}//${window.location.hostname}:${parseInt(
            window.location.port,
            10
          ) + 1}/importKeyboard`,
          {
            method: "POST",
            body: data
          }
        ).then(() => {
          window.location.reload();
        });
      }
    };
    const { selectedKeyboard } = this.state;
    return (
      <Query query={KEYBOARD_QUERY}>
        {({ loading, data, subscribeToMore }) => {
          const { keyboard } = data || {};
          if (loading || !keyboard) return null;
          return (
            <Container fluid className="survey-forms">
              <h4>Keyboard Config </h4>

              <Row>
                <Col sm={3}>
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
                        size="sm"
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
                    <Fragment>
                      <Mutation mutation={RENAME_KEYBOARD}>
                        {renameKeyboard => (
                          <Button
                            color="warning"
                            block
                            size="sm"
                            onClick={() => {
                              const name = prompt(
                                "What is the new name of the keyboard?"
                              );
                              name &&
                                renameKeyboard({
                                  variables: { id: selectedKeyboard, name }
                                });
                            }}
                          >
                            Rename Keyboard
                          </Button>
                        )}
                      </Mutation>
                      <Mutation mutation={REMOVE_KEYBOARD}>
                        {removeKeyboard => (
                          <Button
                            size="sm"
                            color="danger"
                            block
                            onClick={() => {
                              removeKeyboard({
                                variables: { id: selectedKeyboard }
                              });
                              this.setState({ selectedKeyboard: null });
                            }}
                          >
                            Remove Keyboard
                          </Button>
                        )}
                      </Mutation>
                      <Button
                        as="a"
                        block
                        size="sm"
                        href={`${window.location.protocol}//${
                          window.location.hostname
                        }:${parseInt(window.location.port, 10) +
                          1}/exportKeyboard/${selectedKeyboard}`}
                      >
                        Export Keyboard
                      </Button>
                    </Fragment>
                  )}
                  <Label className=" btn-block ">
                    <div className="btn btn-sm btn-info btn-block">
                      Import Keyboard
                    </div>
                    <Input hidden type="file" onChange={importKeyboard} />
                  </Label>
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

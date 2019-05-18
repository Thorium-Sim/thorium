import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";
import EventName from "../MissionConfig/EventName";
import MacroWrapper from "../MissionConfig/MacroConfig";
import EventPicker from "../MissionConfig/EventPicker";
import uuid from "uuid";
const ActionList = ({
  id,
  selectedAction,
  setSelectedAction,
  actions,
  addAction,
  removeAction
}) => {
  return (
    <Fragment>
      <h3>Actions</h3>
      <ListGroup>
        {actions.map(e => (
          <ListGroupItem
            key={`${id}-${e.id}`}
            onClick={() => setSelectedAction(e.id)}
            active={e.id === selectedAction}
          >
            <EventName id={e.event} />{" "}
            <FontAwesome
              name="ban"
              className="text-danger pull-right"
              onClick={() => removeAction(e.id)}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={e => addAction(e.target.value)}
      />
    </Fragment>
  );
};

const ActionConfig = ({ event, delay, args, updateAction }) => {
  return (
    <Fragment>
      <EventName id={event} />{" "}
      <Card className="scroll" style={{ maxHeight: "75vh" }}>
        <CardBody>
          <FormGroup>
            <Label>Item Delay (in milliseconds)</Label>
            <Input
              type="number"
              defaultValue={delay}
              onBlur={e => updateAction("delay", parseInt(e.target.value))}
            />
          </FormGroup>
          <MacroWrapper
            event={event}
            args={args}
            updateMacro={(key, data) => updateAction(key, data)}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
const MacroConfig = ({ macros }) => {
  const [selectedMacro, setSelectedMacro] = React.useState(null);
  const [selectedAction, setSelectedAction] = React.useState(null);
  const macro = macros.find(m => m.id === selectedMacro);
  const actionObj = macro && macro.actions.find(a => a.id === selectedAction);
  return (
    <Container
      style={{
        height: "calc(100vh - 60px)"
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col sm={3} style={{ height: "100%" }}>
          <h3>Macros</h3>
          <ListGroup>
            {macros.map(m => (
              <ListGroupItem
                key={m.id}
                active={m.id === selectedMacro}
                onClick={() => {
                  setSelectedMacro(m.id);
                  setSelectedAction(null);
                }}
              >
                {m.name}
              </ListGroupItem>
            ))}
          </ListGroup>
          <Mutation
            mutation={gql`
              mutation AddMacro($name: String!) {
                addMacro(name: $name)
              }
            `}
          >
            {action => (
              <Button
                color="success"
                size="sm"
                block
                onClick={() => {
                  const name = window.prompt(
                    "What is the name of the new macro?"
                  );
                  if (!name) return;
                  action({ variables: { name } }).then(res => {
                    setSelectedMacro(res.data.addMacro);
                    setSelectedAction(null);
                  });
                }}
              >
                Add Macro
              </Button>
            )}
          </Mutation>
          {macro && (
            <Fragment>
              <Mutation
                mutation={gql`
                  mutation RemoveMacro($id: ID!) {
                    removeMacro(id: $id)
                  }
                `}
              >
                {action => (
                  <Button
                    color="danger"
                    size="sm"
                    block
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this macro?"
                        )
                      ) {
                        action({ variables: { id: selectedMacro } });
                        setSelectedAction(null);
                        setSelectedMacro(null);
                      }
                    }}
                  >
                    Remove Macro
                  </Button>
                )}
              </Mutation>
              <Mutation
                mutation={gql`
                  mutation RenameMacro($id: ID!, $name: String!) {
                    renameMacro(id: $id, name: $name)
                  }
                `}
              >
                {action => (
                  <Button
                    color="warning"
                    size="sm"
                    block
                    onClick={() => {
                      const name = window.prompt(
                        "What is the new name of the macro?",
                        macro.name
                      );
                      if (!name) return;
                      action({
                        variables: { id: selectedMacro, name }
                      });
                    }}
                  >
                    Rename Macro
                  </Button>
                )}
              </Mutation>
            </Fragment>
          )}
        </Col>
        <Mutation
          mutation={gql`
            mutation MacroUpdate($id: ID!, $actions: [ActionInput]!) {
              updateMacroActions(id: $id, actions: $actions)
            }
          `}
        >
          {action => (
            <Fragment>
              <Col sm={3} style={{ height: "100%" }}>
                {macro && (
                  <ActionList
                    key={selectedMacro}
                    {...macro}
                    addAction={e =>
                      action({
                        variables: {
                          id: macro.id,
                          actions: macro.actions.concat({
                            id: uuid.v4(),
                            event: e,
                            args: "{}",
                            delay: 0
                          })
                        }
                      })
                    }
                    removeAction={id =>
                      action({
                        variables: {
                          id: macro.id,
                          actions: macro.actions.filter(a => a.id !== id)
                        }
                      })
                    }
                    selectedAction={selectedAction}
                    setSelectedAction={setSelectedAction}
                  />
                )}
              </Col>
              <Col sm={6}>
                {actionObj && (
                  <ActionConfig
                    key={actionObj.id}
                    {...actionObj}
                    updateAction={(key, data) =>
                      action({
                        variables: {
                          id: macro.id,
                          actions: macro.actions.map(a => {
                            if (a.id === actionObj.id) {
                              return { ...a, [key]: data };
                            }
                            return a;
                          })
                        }
                      })
                    }
                  />
                )}
              </Col>
            </Fragment>
          )}
        </Mutation>
      </Row>
    </Container>
  );
};

export default MacroConfig;

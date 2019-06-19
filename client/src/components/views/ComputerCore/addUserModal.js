import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "helpers/reactstrap";

class AddUserModal extends Component {
  state = {};
  render() {
    const { name, password, level } = this.state;
    const { id, modal, toggle } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle} className="modal-themed">
        <ModalHeader toggle={toggle}>Create User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Username</Label>
            <Input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="text"
              className="txtPassword"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Level</Label>
            <Input
              type="select"
              value={level || ""}
              style={{ padding: 0 }}
              onChange={e => this.setState({ level: e.target.value })}
            >
              <option value="" disabled style={{ color: "black" }}>
                Select a Level
              </option>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <option
                    key={`level-pick-${i}`}
                    value={i + 1}
                    style={{ color: "black" }}
                  >
                    Level {i + 1}
                  </option>
                ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Mutation
            mutation={gql`
              mutation addUser($id: ID!, $user: ComputerCoreUserInput) {
                addComputerCoreUser(id: $id, user: $user) {
                  id
                }
              }
            `}
            variables={{
              id,
              user: { name, password, level: parseInt(level, 10) }
            }}
          >
            {action => (
              <Button
                disabled={!level || !name || !password}
                color="primary"
                onClick={() => {
                  action();
                  toggle();
                }}
              >
                Create User
              </Button>
            )}
          </Mutation>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddUserModal;

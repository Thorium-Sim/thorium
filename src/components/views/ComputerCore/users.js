import React, { Component, Fragment } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import UserModal from "./addUserModal";
class Users extends Component {
  state = {};
  render() {
    const { selectedUser, modal } = this.state;
    const { users, selectedLevel, id } = this.props;
    return (
      <Fragment>
        <Row>
          <Col sm={12} className="content-table">
            <Table bordered>
              <thead>
                <tr>
                  <td>Username</td>
                  <td>Password</td>
                  <td>Level</td>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.level === selectedLevel).map(u => (
                  <tr
                    key={u.id}
                    className={selectedUser === u.id ? "selected" : ""}
                    onClick={() => this.setState({ selectedUser: u.id })}
                  >
                    <td>{u.name}</td>
                    <td>········</td>
                    <td>Level {u.level}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Button
              color="success"
              block
              onClick={() => this.setState({ modal: true })}
            >
              Add User
            </Button>
          </Col>
          <Col sm={{ size: 5, offset: 2 }}>
            <Button color="danger" block disabled={!selectedUser}>
              Remove User
            </Button>
          </Col>
        </Row>
        <UserModal
          id={id}
          modal={modal}
          toggle={() => this.setState({ modal: false })}
        />
      </Fragment>
    );
  }
}

export default Users;

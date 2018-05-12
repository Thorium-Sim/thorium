import React, { Component, Fragment } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import FileModal from "./addFileModal";
class Files extends Component {
  state = {};
  render() {
    const { selectedFile, modal } = this.state;
    const { files, selectedLevel, id } = this.props;
    return (
      <Fragment>
        <Row>
          <Col sm={12} className="content-table">
            <Table bordered>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Level</td>
                </tr>
              </thead>
              <tbody>
                {files.filter(u => u.level === selectedLevel).map(u => (
                  <tr
                    key={u.id}
                    className={selectedFile === u.id ? "selected" : ""}
                    onClick={() => this.setState({ selectedFile: u.id })}
                  >
                    <td>{u.name}</td>
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
              disabled={!selectedFile}
              onClick={() => this.setState({ modal: true })}
            >
              Restore File
            </Button>
          </Col>
          <Col sm={{ size: 5, offset: 2 }}>
            <Button color="warning" block disabled={!selectedLevel}>
              Restore All Level {selectedLevel} Files
            </Button>
          </Col>
        </Row>
        <FileModal
          id={id}
          modal={modal}
          toggle={() => this.setState({ modal: false })}
        />
      </Fragment>
    );
  }
}

export default Files;

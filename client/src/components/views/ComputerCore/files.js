import React, { Component, Fragment } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

function randomString(length, chars) {
  var result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
class FileName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.restoring
        ? "Restoring..."
        : !props.corrupted
          ? props.name
          : randomString(
              10,
              "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\"
            )
    };
  }
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    clearTimeout(this.looping);
    this.looping = false;
  }
  loop = () => {
    if (this.props.corrupted) {
      this.setState({
        name: randomString(
          10,
          "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\"
        )
      });
    }
    setTimeout(this.loop, Math.random() * 2000 + 500);
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.corrupted === prevProps.corrupted &&
      this.props.restoring === prevProps.restoring
    )
      return;
    this.setState({
      name: this.props.restoring
        ? "Restoring..."
        : !this.props.corrupted
          ? this.props.name
          : randomString(
              10,
              "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\"
            )
    });
  }
  render() {
    return this.state.name;
  }
}
class Files extends Component {
  state = {};
  render() {
    const { selectedFile } = this.state;
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
                    <td>
                      <FileName {...u} />
                    </td>
                    <td>Level {u.level}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Mutation
          mutation={gql`
            mutation RestoreFile($id: ID!, $fileId: ID, $level: Int) {
              restoreComputerCoreFile(id: $id, fileId: $fileId, level: $level)
            }
          `}
        >
          {action => (
            <Row>
              <Col sm={5}>
                <Button
                  color="success"
                  block
                  disabled={!selectedFile}
                  onClick={() =>
                    action({ variables: { id, fileId: selectedFile } })
                  }
                >
                  Restore File
                </Button>
              </Col>
              <Col sm={{ size: 5, offset: 2 }}>
                <Button
                  color="warning"
                  block
                  disabled={!selectedLevel}
                  onClick={() =>
                    action({ variables: { id, level: selectedLevel } })
                  }
                >
                  Restore All Level {selectedLevel} Files
                </Button>
              </Col>
            </Row>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default Files;

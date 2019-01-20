import React, { Component } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
class GroupManager extends Component {
  state = { sender: "", destination: "nothing" };
  render() {
    const { cancel, simulator, teams, startConvo } = this.props;
    const { sender, destination, isStation } = this.state;
    const stationNames = simulator.stations.map(s => s.name);
    const messageGroups = simulator.stations
      .reduce((prev, s) => prev.concat(s.messageGroups), [])
      .filter((a, i, arr) => arr.indexOf(a) === i);
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <p>Destination:</p>
            <select
              style={{ height: "18px" }}
              value={destination}
              onChange={e =>
                this.setState({
                  destination: e.target.value,
                  isStation: stationNames.indexOf(e.target.value) > -1
                })
              }
            >
              <option value="nothing" disabled>
                Select a destination
              </option>
              {stationNames.map(s => (
                <option key={`station-${s}`} value={s}>
                  {s}
                </option>
              ))}
              {messageGroups.length && <option disabled>------------</option>}
              {messageGroups.map(s => (
                <option key={`messageGroup-${s}`} value={s}>
                  {s}
                </option>
              ))}
              {teams.length && <option disabled>------------</option>}
              {teams.map(s => (
                <option key={`messageGroup-${s.id}`} value={s.name}>
                  {s.name} - {s.type}
                </option>
              ))}
            </select>
          </Col>
          <Col sm={6}>
            <p>Sender:</p>
            <Input
              type="text"
              bsSize="sm"
              style={{ height: "18px" }}
              value={sender}
              disabled={!isStation}
              onChange={e => this.setState({ sender: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Button block color="danger" size="sm" onClick={cancel}>
              Cancel
            </Button>
          </Col>
          <Col sm={6}>
            <Button
              block
              color="success"
              size="sm"
              disabled={isStation ? !sender || !destination : !destination}
              onClick={() =>
                startConvo(isStation ? sender : destination, destination)
              }
            >
              Start
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GroupManager;

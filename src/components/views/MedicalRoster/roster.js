import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from "reactstrap";
class Roster extends Component {
  state = { roster: "bridge" };
  render() {
    const { crew, sickbayRoster } = this.props;
    const { selectedCrew, roster } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Row>
              <Col sm={6}>
                <Button
                  color="secondary"
                  block
                  onClick={() => this.setState({ roster: "bridge" })}
                  active={roster === "bridge"}
                >
                  Bridge Crew
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  color="primary"
                  block
                  onClick={() => this.setState({ roster: "crew" })}
                  active={roster === "crew"}
                >
                  Duty Crew
                </Button>
              </Col>
            </Row>
            <ListGroup style={{ height: "60vh", overflowY: "auto" }}>
              {roster === "bridge" &&
                sickbayRoster.length === 0 && (
                  <ListGroupItem>
                    <ListGroupItemHeading>No bridge crew.</ListGroupItemHeading>
                  </ListGroupItem>
                )}
              {(roster === "bridge" ? sickbayRoster : crew).map(c => (
                <ListGroupItem
                  key={c.id}
                  active={selectedCrew === c.id}
                  onClick={() => this.setState({ selectedCrew: c.id })}
                >
                  <ListGroupItemHeading>
                    {c.lastName}, {c.firstName}
                  </ListGroupItemHeading>
                  <ListGroupItemText>{c.position}</ListGroupItemText>
                </ListGroupItem>
              ))}
            </ListGroup>
            {roster === "bridge" && (
              <Button color="success" block>
                Add Bridge Crew
              </Button>
            )}
          </Col>
          <Col sm={3} />
        </Row>
      </Container>
    );
  }
}
export default Roster;

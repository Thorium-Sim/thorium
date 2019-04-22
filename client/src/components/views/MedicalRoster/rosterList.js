import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import escapeRegex from "escape-string-regexp";

class RosterList extends Component {
  state = { roster: "bridge" };
  render() {
    const { roster, search } = this.state;
    const { sickbayRoster, crew, add, selectedCrew, selectCrew } = this.props;
    return (
      <Fragment>
        <Row>
          <Col sm={6}>
            <Button
              className="bridge-crew"
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
              className="duty-crew"
              color="primary"
              block
              onClick={() => this.setState({ roster: "crew" })}
              active={roster === "crew"}
            >
              Duty Crew
            </Button>
          </Col>
        </Row>
        <Input
          className="search-crew"
          style={{ marginTop: "20px" }}
          type="text"
          value={search}
          onChange={e => this.setState({ search: e.target.value })}
          placeholder="Search..."
        />
        <ListGroup style={{ height: "60vh", overflowY: "auto" }}>
          {roster === "bridge" && sickbayRoster.length === 0 && (
            <ListGroupItem>
              <ListGroupItemHeading>No bridge crew.</ListGroupItemHeading>
            </ListGroupItem>
          )}
          {(roster === "bridge" ? sickbayRoster : crew)
            .filter(f => {
              if (search) {
                return (
                  f.firstName.match(
                    new RegExp(escapeRegex(search || ""), "gi")
                  ) ||
                  f.lastName.match(new RegExp(escapeRegex(search || ""), "gi"))
                );
              }
              return true;
            })
            .map(c => (
              <ListGroupItem
                key={c.id}
                active={selectedCrew && selectedCrew.id === c.id}
                onClick={() => selectCrew(c)}
              >
                <ListGroupItemHeading>
                  {c.lastName}, {c.firstName}
                </ListGroupItemHeading>
                <ListGroupItemText>{c.position}</ListGroupItemText>
              </ListGroupItem>
            ))}
        </ListGroup>
        {roster === "bridge" && add && (
          <Button
            color="success"
            className="add-crew"
            block
            onClick={() => selectCrew({})}
          >
            Add Bridge Crew
          </Button>
        )}
      </Fragment>
    );
  }
}

export default RosterList;

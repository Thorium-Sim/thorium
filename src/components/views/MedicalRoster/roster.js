import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Input,
  Button
} from "reactstrap";
import RosterDetail from "./rosterDetail";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Roster extends Component {
  state = { roster: "bridge", search: "", selectedCrew: { id: "newCrew" } };
  updateSelectedCrew = value => {
    this.setState({ selectedCrew: { ...this.state.selectedCrew, ...value } });
  };
  render() {
    const { id, crew, sickbayRoster, simulator } = this.props;
    const { selectedCrew, roster, search } = this.state;
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
            <Input
              style={{ marginTop: "20px" }}
              type="text"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
              placeholder="Search..."
            />
            <ListGroup style={{ height: "60vh", overflowY: "auto" }}>
              {roster === "bridge" &&
                sickbayRoster.length === 0 && (
                  <ListGroupItem>
                    <ListGroupItemHeading>No bridge crew.</ListGroupItemHeading>
                  </ListGroupItem>
                )}
              {(roster === "bridge" ? sickbayRoster : crew)
                .filter(f => {
                  if (search) {
                    return (
                      f.firstName.match(new RegExp(search, "gi")) ||
                      f.lastName.match(new RegExp(search, "gi"))
                    );
                  }
                  return true;
                })
                .map(c => (
                  <ListGroupItem
                    key={c.id}
                    active={selectedCrew && selectedCrew.id === c.id}
                    onClick={() => this.setState({ selectedCrew: c })}
                  >
                    <ListGroupItemHeading>
                      {c.lastName}, {c.firstName}
                    </ListGroupItemHeading>
                    <ListGroupItemText>{c.position}</ListGroupItemText>
                  </ListGroupItem>
                ))}
            </ListGroup>
            {roster === "bridge" && (
              <Button
                color="success"
                block
                onClick={() => this.setState({ selectedCrew: {} })}
              >
                Add Bridge Crew
              </Button>
            )}
          </Col>
          <Col sm={9}>
            <Mutation
              mutation={gql`
                mutation AddSickbayRoster($id: ID!, $crew: CrewInput!) {
                  addSickbayCrew(id: $id, crew: $crew)
                }
              `}
              variables={{
                id,
                simulatorId: simulator.id,
                crew: selectedCrew && {
                  firstName: selectedCrew.firstName,
                  lastName: selectedCrew.lastName,
                  age: selectedCrew.age,
                  gender: selectedCrew.gender,
                  rank: selectedCrew.rank,
                  position: selectedCrew.position
                }
              }}
            >
              {action => (
                <RosterDetail
                  action={() => {
                    action();
                    this.updateSelectedCrew({ id: "newCrew" });
                  }}
                  {...selectedCrew || {}}
                  update={this.updateSelectedCrew}
                />
              )}
            </Mutation>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Roster;

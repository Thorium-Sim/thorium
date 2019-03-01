import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import RosterDetail from "./rosterDetail";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import RosterList from "./rosterList";
class Roster extends Component {
  state = { roster: "bridge", search: "", selectedCrew: { id: "newCrew" } };
  updateSelectedCrew = value => {
    this.setState({ selectedCrew: { ...this.state.selectedCrew, ...value } });
  };
  render() {
    const { id, crew, sickbayRoster, simulator } = this.props;
    const { selectedCrew } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <RosterList
              selectedCrew={selectedCrew}
              selectCrew={c => this.setState({ selectedCrew: c })}
              crew={crew}
              sickbayRoster={sickbayRoster}
              add
            />
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

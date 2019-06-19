import React, { Component } from "react";
import { Container, Row, Col } from "helpers/reactstrap";
import RosterDetail from "./rosterDetail";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import RosterList from "./rosterList";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";

export const trainingSteps = [
  {
    selector: "#nothing",
    content: (
      <FormattedMessage
        id="medicalRoster-training-1"
        defaultMessage="The medical roster allows you to see a roster of all crew members. It's primary purpose is to allow you to enter the information of the bridge crew so they can be admitted to the sickbay."
      />
    )
  },
  {
    selector: ".duty-crew",
    content: (
      <FormattedMessage
        id="medicalRoster-training-2"
        defaultMessage="This button will allow you to see all of the crew members on the ship other than the bridge crew."
      />
    )
  },
  {
    selector: ".search-crew",
    content: (
      <FormattedMessage
        id="medicalRoster-training-4"
        defaultMessage="This field allows you to search the crew list by name."
      />
    )
  },
  {
    selector: ".bridge-crew",
    content: (
      <FormattedMessage
        id="medicalRoster-training-3"
        defaultMessage="This button allows you to see the bridge crew. Make sure you click this button before continuing on."
      />
    )
  },
  {
    selector: ".add-crew",
    content: (
      <FormattedMessage
        id="medicalRoster-training-5"
        defaultMessage="This button allows you to add a new crew member. Click this button to continue."
      />
    )
  },
  {
    selector: ".crew-form",
    content: (
      <FormattedMessage
        id="medicalRoster-training-6"
        defaultMessage="Fill in these fields with all the information you have available on the crew member you are adding."
      />
    )
  },
  {
    selector: ".finish-adding-crew",
    content: (
      <FormattedMessage
        id="medicalRoster-training-7"
        defaultMessage="Click this button to finish adding the crew member. They are now available to be admitted to the sickbay."
      />
    )
  }
];

class Roster extends Component {
  state = { roster: "bridge", search: "", selectedCrew: { id: "newCrew" } };
  updateSelectedCrew = value => {
    this.setState({ selectedCrew: { ...this.state.selectedCrew, ...value } });
  };
  render() {
    const { id, crew, sickbayRoster, simulator, clientObj } = this.props;
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
        <Tour steps={trainingSteps} client={clientObj} />
      </Container>
    );
  }
}
export default Roster;

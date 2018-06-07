import React, { Component } from "react";
import { Container } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "reactour";

import Bunk from "./bunk";
import AdmitModal from "./admitModal";
import BunkDetail from "./bunkDetail";

class Sickbay extends Component {
  state = { modal: false };
  trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <span>
          This screen is used to attend to the medical needs of members of your
          crew or guests on your starship. Medical care is given when a patient
          is placed into a medical bunk. These bunks have personal scanners
          which can be used to help you diagnose the patient.
        </span>
      )
    },
    {
      selector: ".nothing",
      content: (
        <span>
          Your job will be to take vitals for your patients, assess their
          symptoms, diagnose the patient, and provide treatment.
        </span>
      )
    },
    {
      selector: ".bunk",
      content: (
        <span>
          This is one of your bunks. You can see the status of the bunk,
          including whether there is a patient admitted, and how long the
          patient has been treated for. If there is no patient in the bunk, you
          can admit a patient. Otherwise, you can begin treating the patient in
          the bunk by pressing the 'Status' button, or discharge the patient.
        </span>
      )
    }
  ];
  modalTraining = [
    {
      selector: ".modal-themed",
      content: (
        <span>
          Use this view to choose which crew member you want to treat. You can
          choose bridge crew members (the crew members who are currently on the
          bridge), or duty crew members (crew members on other parts of the ship
          who have come to the sickbay). You must add bridge crew members on the
          medical roster screen. Choose a patient and then click 'Admit
          Patient'.
        </span>
      )
    }
  ];
  admitPatient = action => {
    return () => {
      action().then(() => {
        setTimeout(
          () =>
            this.setState({
              admitBunk: null,
              selectedCrew: null,
              modal: null,
              selectedBunk: this.state.admitBunk
            }),
          200
        );
      });
    };
  };
  render() {
    const {
      id,
      bunks,
      sickbayRoster,
      crew,
      clientObj,
      stopTraining
    } = this.props;
    const { modal, admitBunk, selectedCrew, selectedBunk } = this.state;
    if (selectedBunk) {
      return (
        <BunkDetail
          {...this.props}
          sickbayId={id}
          backToMain={() => this.setState({ selectedBunk: null })}
          {...bunks.find(b => b.id === selectedBunk)}
        />
      );
    }
    return (
      <Container className="card-sickbay">
        {bunks.map((b, i) => (
          <Bunk
            key={b.id}
            {...b}
            num={i + 1}
            sickbayId={id}
            openBunk={() => this.setState({ selectedBunk: b.id })}
            openModal={() => this.setState({ modal: true, admitBunk: b.id })}
          />
        ))}
        <Mutation
          mutation={gql`
            mutation AssignPatient($id: ID!, $bunkId: ID!, $crewId: ID!) {
              assignPatient(id: $id, bunkId: $bunkId, crewId: $crewId)
            }
          `}
          variables={{
            id,
            bunkId: admitBunk,
            crewId: selectedCrew && selectedCrew.id
          }}
        >
          {action => (
            <AdmitModal
              modal={modal}
              toggle={() => this.setState({ modal: false, admitBunk: null })}
              selectedCrew={selectedCrew}
              selectCrew={c => this.setState({ selectedCrew: c })}
              crew={crew}
              sickbayRoster={sickbayRoster}
              admitPatient={this.admitPatient(action)}
            />
          )}
        </Mutation>
        <Tour
          steps={modal ? this.modalTraining : this.trainingSteps}
          isOpen={clientObj.training}
          onRequestClose={stopTraining}
        />
      </Container>
    );
  }
}
export default Sickbay;

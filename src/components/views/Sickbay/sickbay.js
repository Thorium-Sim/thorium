import React, { Component } from "react";
import { Container } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Bunk from "./bunk";
import AdmitModal from "./admitModal";

class Sickbay extends Component {
  state = { modal: false };
  admitPatient = action => {
    return () => {
      action().then(() => {
        this.setState({
          admitBunk: null,
          selectedCrew: null,
          modal: null,
          selectedBunk: this.state.admitBunk
        });
      });
    };
  };
  render() {
    const { id, bunks, sickbayRoster, crew } = this.props;
    const { modal, admitBunk, selectedCrew, selectedBunk } = this.state;
    if (selectedBunk)
      return (
        <Container className="card-sickbay" fluid>
          Hello!
        </Container>
      );
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
      </Container>
    );
  }
}
export default Sickbay;

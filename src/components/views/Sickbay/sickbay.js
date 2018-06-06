import React, { Component } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import Bunk from "./bunk";
import RosterList from "../MedicalRoster/rosterList";

const AdmitModal = ({
  modal,
  toggle,
  selectedCrew,
  selectCrew,
  crew,
  sickbayRoster
}) => {
  return (
    <Modal className="modal-themed" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Admit Patient</ModalHeader>
      <ModalBody>
        <RosterList
          selectedCrew={selectedCrew}
          selectCrew={selectCrew}
          crew={crew}
          sickbayRoster={sickbayRoster}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
class Sickbay extends Component {
  state = { modal: false };
  render() {
    const { id, bunks, sickbayRoster, crew } = this.props;
    const { modal, admitBunk, selectedCrew } = this.state;
    return (
      <Container fluid className="card-sickbay">
        {bunks.map((b, i) => (
          <Bunk
            key={b.id}
            {...b}
            num={i + 1}
            openModal={() => this.setState({ modal: true, admitBunk: b.id })}
          />
        ))}
        <AdmitModal
          modal={modal}
          toggle={() => this.setState({ modal: false, admitBunk: null })}
          selectCrew={c => this.setState({ selectedCrew: c })}
          crew={crew}
          sickbayRoster={sickbayRoster}
        />
      </Container>
    );
  }
}
export default Sickbay;

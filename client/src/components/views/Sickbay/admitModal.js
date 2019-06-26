import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col
} from "helpers/reactstrap";
import RosterList from "../MedicalRoster/rosterList";

const AdmitModal = ({
  modal,
  toggle,
  selectedCrew,
  selectCrew,
  crew,
  sickbayRoster,
  admitPatient
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
        <Col sm={{ size: 4, offset: 4 }}>
          <Button color="warning" block onClick={toggle}>
            Cancel
          </Button>
        </Col>
        <Col sm={4}>
          <Button
            color="success"
            block
            disabled={!selectedCrew}
            onClick={admitPatient}
          >
            Admit Patient
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default AdmitModal;
